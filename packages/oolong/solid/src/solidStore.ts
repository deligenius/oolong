import { createSignal, onCleanup } from "solid-js";
import { MiddlewareFn, vanillaStore } from "@oolong/core/src/index.js";

export function createStore<T>(
  initState: T,
  options?: {
    use?: MiddlewareFn<T>[];
  }
) {
  const instance = vanillaStore(initState, options);

  const solidStore = <S extends unknown = T>(selector?: (state: T) => S) => {
    const _selector = selector ?? ((state: T) => state as unknown as S);

    const initSubValue = _selector(instance.get());

    const [signal, setSignal] = createSignal(initSubValue);

    const unsubscrine = instance.subscribe(_selector, (newVal) => {
      setSignal(() => newVal);
    });
    onCleanup(unsubscrine);

    return signal;
  };

  solidStore.subscribe = instance.subscribe.bind(instance);
  solidStore.get = instance.get.bind(instance);
  solidStore.set = instance.set.bind(instance);
  solidStore.reset = instance.reset.bind(instance);
  solidStore.destory = instance.destory.bind(instance);

  return solidStore;
}
