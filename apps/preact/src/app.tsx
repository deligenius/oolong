import { useState } from "preact/hooks";
import { createStore } from "@oolong/preact";

const countStore = createStore(0);

export function App() {
  const countState = countStore();
  const [count1, setCount1] = useState(0);

  return (
    <>
      <div>Count: {countState}</div>
      <button onClick={() => countStore.set(prev => prev +1)}>Increment</button>
    </>
  );
}
