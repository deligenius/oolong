// import { useState } from "preact/hooks";
import { Button } from "../components/Button.tsx";
import { counterStore } from "../components/Counter.store.ts";

export default function Counter() {
  return <ChildCounter1 />;
}

function ChildCounter1() {
  const count1 = counterStore((state) => state.count1);
  console.log("Counter1", count1, counterStore.get());

  return (
    <div class="flex gap-2 w-full">
      <p class="flex-grow-1 font-bold text-xl text-[#333333]">{count1}</p>
      <Button
        onClick={() => {
          counterStore.set((state) => {
            state.count1 -= 1;
          });
        }}
      >
        -1
      </Button>
      <Button
        onClick={() => {
          counterStore.set((state) => {
            state.count1 += 1;
          });
        }}
      >
        +1
      </Button>
    </div>
  );
}
