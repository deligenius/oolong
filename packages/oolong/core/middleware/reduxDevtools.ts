import { MiddlewareFn } from "../vanillaStore.js";

const isSSR = typeof window === "undefined";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: any;
  }
}


export function devtool<T>({
  name,
  enable = true,
}: {
  name: string;
  enable?: boolean;
}): MiddlewareFn<T> {
  if (isSSR || !enable) {
    return () => ({ name: devtool.name });
  }

  return (get, set, subscribe) => {
    if (window?.__REDUX_DEVTOOLS_EXTENSION__ as any) {
      const conn = window.__REDUX_DEVTOOLS_EXTENSION__.connect({
        name: `${name} - ${crypto.randomUUID().slice(0, 5)}`,
        instanceId: Math.floor(Math.random() * 10000),
      });

      let storeState = get();
      conn.init(storeState);

      let sendFromDevTools = false;
      conn.subscribe((event: any) => {
        if (event.type === "DISPATCH") {
          const state = JSON.parse(event.state) as T;
          sendFromDevTools = true;
          set(state);
          sendFromDevTools = false;
        }
      });

      subscribe(
        (state) => state,
        (newVal, oldVal, actionName = "update") => {
          if (!sendFromDevTools) {
            storeState = newVal;
            conn.send(`${actionName}`, storeState);
          }
        }
      );
    }

    return { name: devtool.name };
  };
}
