import { Component, createMemo, createRoot, createSignal } from "solid-js";
import { MiddlewareFn, vanillaStore } from "./vanillaStore";


export function createStore<T>(
  initState: T,
  options?: {
    use?: any[];
  }
) {
  const instance = vanillaStore(initState, options);

  const solidStore = <S extends unknown = T>(selector?: (state: T) => S) => {
    const realSelector = selector ?? ((state: T) => state as unknown as S);

    const initSubValue = realSelector(instance.get());

    const [signal, setSignal] = createSignal(initSubValue);

    instance.subscribe(realSelector, (newVal) => {
      setSignal(() => newVal);
    });

    return signal
  };

  solidStore.subscribe = instance.subscribe.bind(instance);
  solidStore.get = instance.get.bind(instance);
  solidStore.set = instance.set.bind(instance);
  solidStore.reset = instance.reset.bind(instance);
  solidStore.destory = instance.destory.bind(instance);

  return solidStore;
}

// const counterStore = createStore({
//   counter1: 0,
//   counter2: 0,
// });