import {
  createEffect,
  createRenderEffect,
  createSignal,
  onCleanup,
} from "solid-js";
import { countStore } from "./Counter.store";

export default function Counter() {
  const count2 = countStore((s) => s.count2);

  createEffect(() => console.log("count2 =", count2()));

  return (
    <div>
      count2 is {count2()}
      <button
        onClick={() =>
          countStore.set((prev) => {
            prev.count2++;
          })
        }
      >
        Increment{" "}
      </button>
    </div>
  );
}
