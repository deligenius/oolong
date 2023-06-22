import { useState } from "react";
import { createStore } from "@oolong/react";
import {  } from "@oolong/core/middleware";

const countStore = createStore(0);

function App() {
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

export default App;
