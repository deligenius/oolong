import { MiddlewareFn, VanillaStore, vanillaStore } from "@oolong/core";
import { useSyncExternalStoreWithSelector } from "use-sync-external-store/shim/with-selector.js";

export type ReactStore<T> = ReturnType<typeof createStore<T>>;
export type InferState<T> = T extends VanillaStore<infer S>
  ? S
  : T extends ReactStore<infer S>
  ? S
  : never;

export const createStore = <T>(
  initState: T,
  options?: {
    use?: MiddlewareFn<T>[];
  }
) => {
  const instance = vanillaStore<T>(initState, options);

  const getSnapshot = () => instance.get();
  const backupSelector = <S>(state: T) => state as unknown as S;

  const reactStore = <S extends unknown = T>(selector: (state: T) => S) => {
    const realSelector = selector ?? backupSelector<S>;

    return useSyncExternalStoreWithSelector(
      instance._subscribe,
      getSnapshot,
      getSnapshot,
      realSelector
    );
  };

  reactStore.get = instance.get.bind(instance);
  reactStore.set = instance.set.bind(instance);
  reactStore.reset = instance.reset.bind(instance);
  reactStore.subscribe = instance.subscribe.bind(instance);
  reactStore.destory = instance.destory.bind(instance);
  reactStore.type = undefined as T;

  return reactStore;
};
