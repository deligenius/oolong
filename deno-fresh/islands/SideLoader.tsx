import { counterStore } from "../components/Counter.store.ts";

interface InitState {
  initial: {
    count1: number;
    count2: number;
  };
}

const SideLoader = ({ initial }: InitState) => {
  counterStore.set(initial, {
    broadCast: false,
  });

  return <div style={{ display: "none" }}></div>;
};

export default SideLoader;
