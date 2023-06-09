import {
  createEffect,
  createRenderEffect,
  createSignal,
  onCleanup,
} from "solid-js";
import { countStore } from "./Counter.store";

export default function Counter() {
  const count1 = countStore((s) => s.count1);

  createEffect(() => console.log("count1 =", count1()));

  return (
    <div>
      count is {count1()}
      <button
        onClick={() =>
          countStore.set((prev) => {
            prev.count1++;
          })
        }
      >
        Increment{" "}
      </button>
    </div>
  );
}
