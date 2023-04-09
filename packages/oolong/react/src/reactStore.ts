import { MiddlewareFn, VanillaStore, vanillaStore } from "@oolong/core";
import { useSyncExternalStore } from "use-sync-external-store/shim";

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

  const createReactStore = <S extends unknown = T>(
    selector?: (state: T) => S
  ) => {
    const getSnapshot = () =>
      selector ? selector(instance.get()) : (instance.get() as unknown as S);

    return useSyncExternalStore(instance._subscribe, getSnapshot);
  };

  createReactStore.get = instance.get.bind(instance);
  createReactStore.set = instance.set.bind(instance);
  createReactStore.reset = instance.reset.bind(instance);
  createReactStore.subscribe = instance.subscribe.bind(instance);
  createReactStore.destory = instance.destory.bind(instance);

  return createReactStore;
};
