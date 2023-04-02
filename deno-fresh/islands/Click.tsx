import { useState } from "preact/hooks";

export default function Click() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>click</div>
      {/* <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        click
      </button>
      <div>{count}</div> */}
    </>
  );
}
