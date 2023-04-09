import { createSignal, onCleanup } from "solid-js";

import { createStore } from "@oolong/solid";
const countStore = createStore(0);

export default function Counter() {
  const count = countStore();

  return (
    <div>
      count is {count()}
      <button onClick={() => countStore.set((prev) => prev + 1)}>
        Increment{" "}
      </button>
    </div>
  );
}
