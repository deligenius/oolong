import { createStore } from "@oolong/react";
// import { create } from "zustand";

export const counterStore = createStore(0);
export const increment = () => counterStore.set((state) => state + 1);

// type State = {
//   count: number;
//   increment: () => void;
//   decrement: () => void;
// };

// export const counterStore = create<State>((set) => ({
//   count: 0,
//   increment: () => set((state) => ({ count: state.count + 1 })),
//   decrement: () => set((state) => ({ count: state.count - 1 })),
// }));
