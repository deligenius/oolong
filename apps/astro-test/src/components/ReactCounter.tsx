import { counterStore, increment } from "./counter.store";

export const ReactCounter = () => {
  const count = counterStore();
  return (
    <div>
      counter: {count}
      <button onClick={() => increment()}>+</button>
    </div>
  );
};
