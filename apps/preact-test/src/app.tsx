import { useState } from "preact/hooks";
import { createStore } from "@oolong/preact/src";

const countStore = createStore(0);

export function App() {
  const count = countStore();

  return (
    <div>
      count is {count}
      <button onClick={() => countStore.set((prev) => prev + 1)}>
        Increment{" "}
      </button>
    </div>
  );
}
