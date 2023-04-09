import { Button } from "../components/Button.tsx";
import { counterStore } from "../components/Counter.store.ts";

export default function Counter2() {
  const count2 = counterStore((state) => state.count2);

  console.log("Counter2", count2, counterStore.get());

  return (
    <div class="flex gap-2 w-full">
      <p class="flex-grow-1 font-bold text-xl text-[#333333]">count1 state: {count2}</p>
      <Button
        onClick={() => {
          counterStore.set((state) => {
            state.count2 -= 1;
          });
        }}
      >
        -1
      </Button>
      <Button
        onClick={() => {
          counterStore.set((state) => {
            state.count2 += 1;
          });
        }}
      >
        +1
      </Button>
      <Button
        onClick={() => {
          counterStore.reset();
        }}
      >
        Reset
      </Button>
    </div>
  );
}
