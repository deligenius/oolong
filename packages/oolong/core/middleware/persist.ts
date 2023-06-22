import { produce } from "immer";
import { MiddlewareFn } from "../vanillaStore.js";

const isSSR = typeof window === "undefined";

export function persist<T>({
  name,
  getStorage,
  serialize = JSON.stringify,
  deserialize = JSON.parse,
  version = "0",
  migrate,
}: {
  name: string;
  version?: string;
  migrate?: (state: T) => void;
  /** supports LocalStroage or SessionStorage */
  getStorage?: () => Storage;
  serialize?: (state: T) => string;
  deserialize?: (state: string) => T;
}): MiddlewareFn<T> {
  if (isSSR) {
    return () => ({ name: persist.name });
  }

  return function (get, set, subscribe) {
    type PersistedState = {
      _version?: string;
    } & T;

    try {
      const storage = getStorage?.() ?? window.localStorage;

      subscribe(
        (state) => state,
        (newVal) => {
          const persistedState: PersistedState = {
            _version: version,
            ...newVal,
          };
          storage?.setItem(name, serialize(persistedState));
        }
      );

      const localStateJSON = storage?.getItem(name);
      if (localStateJSON) {
        const localState = deserialize(localStateJSON) as PersistedState;
        if (localState._version !== version) {
          delete localState._version;

          if (migrate) {
            const migratedState = produce(localState, migrate);
            set(migratedState, { broadCast: false });
          } else {
            set(localState, { broadCast: false });
          }
        } else {
          // same version, set it
          set(localState, { broadCast: false });
        }
      }
    } catch (e) {
      console.warn("Can't access storage: " + name);
    } finally {
      return { name: persist.name };
    }
  };
}
