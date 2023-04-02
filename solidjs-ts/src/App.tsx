import { onCleanup } from "solid-js";
import { createStore } from "./oolong/solidStore";

const counterStore = createStore({
  counter1: 0,
  counter2: 0,
});

function Counter() {
  const count1 = counterStore((s) => s.counter1);

  const unsubscribe = counterStore.subscribe(
    (s) => s.counter1,
    (newVal) => {
      console.log("counter1 changed", newVal);
    }
  );
  onCleanup(() => {
    unsubscribe();
  });

  return (
    <>
      <button
        type="button"
        onClick={() => {
          counterStore.set((prev) => {
            prev.counter1 += 1;
          });
        }}
      >
        {count1()}
      </button>
      <Nested />
    </>
  );
}

function Nested() {
  const counter2 = counterStore();

  counterStore.subscribe(
    (s) => s,
    (newVal) => {
      console.log("counter obj updated ", newVal);
    }
  );

  return <div> this is nested counter2 {counter2().counter2}</div>;
}

export default Counter;
