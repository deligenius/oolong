import { enableMapSet, produce } from "immer";

enableMapSet();

const isFunction = (fn: any): fn is Function => typeof fn === "function";

type Listener<T> = (newVal: T, oldVal: T, actionName?: string) => void;

type Getter<T> = () => T;
type Setter<T> = (
  newVal: T | ((draft: T) => void),
  options?: SetterOptions<T>
) => void;

type SetterOptions<T> = {
  broadCast?: boolean | ((newState: T, oldState: T) => boolean);
  actionName?: string;
};

type Subscribe<T, S extends any = T> = (
  selector: (state: T) => S,
  optListener: (newVal: S, oldVal: S, actionName?: string) => void,
  options?: {
    isEqual?: (oldVal: S, newVal: S) => boolean;
    runOnMount?: boolean;
  }
) => () => void;

export type MiddlewareFn<T> = (
  get: () => T,
  set: Setter<T>,
  subscribe: Subscribe<T>
) => {
  initState?: T;
  /** name of the middleware */
  name: string;
};

export type VanillaStore<T> = ReturnType<typeof vanillaStore<T>>;

export const vanillaStore = <T>(
  initialState: T,
  options?: { use?: MiddlewareFn<T>[] }
) => {
  /** Get the state */
  const get: Getter<T> = () => {
    return _state;
  };

  /** Set a state */
  const set: Setter<T> = function (newState, options) {
    const { broadCast = true, actionName } = options ?? {};

    const oldState = _state;
    let updatedState: T;
    if (isFunction(newState)) {
      updatedState = produce(_state, newState);
    } else {
      updatedState = newState;
    }

    if (!Object.is(updatedState, oldState)) {
      _state = updatedState;

      const shouldBroadCast = isFunction(broadCast)
        ? broadCast(updatedState, oldState)
        : broadCast;
      if (shouldBroadCast) {
        _broadcast(updatedState, oldState, actionName);
      }
    }
  };

  /** Broad cast values to the listeners */
  const _broadcast = (updatedState: T, oldState: T, actionName?: string) => {
    listeners.forEach((listener) =>
      listener(updatedState, oldState, actionName)
    );
  };

  const _subscribe = (listener: Listener<T>) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  };

  const _unsubscribe = (listener: Listener<T>) => {
    listeners.delete(listener);
  };

  /** 
 * Subscribe to the state changes, return a unsubscribe function
 * 
 * ```ts
  const todos = store([]);
  const unsubscribe = todos.subscribe(
    (state) => state,
    (newVal, oldVal) => {
      console.log("newVal", newVal);
    }
  );
  ```
 * 
 */
  const subscribe: Subscribe<T> = (selector, optListener, options) => {
    const equal = options?.isEqual ?? Object.is;

    /** a slice is a snapshot of the state */
    let currSnapshot = selector(_state);
    let internalListener: Listener<T> = (newState, oldState, actionName) => {
      // when internalListner is called, it means the state has changed
      const nextSnapshot = selector(newState);
      if (!equal(currSnapshot, nextSnapshot)) {
        /** exchange currentState and nextState */
        const prevSnapshot = currSnapshot;
        currSnapshot = nextSnapshot;
        optListener(currSnapshot, prevSnapshot, actionName);
      }
    };
    if (options?.runOnMount) {
      optListener(currSnapshot, currSnapshot);
    }
    _subscribe(internalListener);

    return _unsubscribe.bind(null, internalListener);
  };

  /* ------------------ initialize the states and middlewares ----------------- */
  let _state: T = initialState;
  const listeners = new Set<Listener<T>>();
  if (options?.use) {
    options.use.forEach((middleware) => {
      // middleware may or maynot set a new state
      middleware(get, set, subscribe);
    });
  }

  /* -----------------------------------end------------------------------------ */

  return {
    get,
    set,
    reset: (options?: SetterOptions<T>) => {
      const { broadCast = true, actionName = "reset" } = options ?? {};
      set(initialState, {
        broadCast,
        actionName,
      });
    },
    destory: () => listeners.clear(),
    subscribe,
    _subscribe,
  };
};
