# Oolong

> Simple & Efficient state management library for React.js.

<details>
<summary>What is oolong</summary>

- Oolong is a famous tea.

- Oolong or "Wulong" is a Chinese term. It roughly translates to "own goal" in English. The term "own goal" refers to a situation in sports, particularly in soccer, when a player inadvertently scores a goal against their own team. The term "wulong" was adopted by Hong Kong journalists in the 1960s and 1970s to translate "own goal" because of its similar pronunciation and its connotations of making a mistake or being confused in Cantonese.
</details>

<details>
<summary>Quick Start</summary>

- Install `oolong/react` package to your React.js project

  ```sh
  npm i @oolong/react
  ```

- Create a `counterStore`

  ```tsx
  import { createStore } from "@oolong/react";

  const counterStore = createStore(0);

  function App() {
    // subscribe count value
    const count = counterStore();

    return (
      <div>
        counter: {count}
        <button onClick={() => counterStore.set((prev) => prev + 1)}>
          Increment
        </button>
      </div>
    );
  }
  ```

- Done!

</details>

## Create a store

Create a external store for your states is easy with Oolong. You may define a type of the store by passing it to `createStore`.

```ts
import { createStore } from "@oolong/react";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

interface TodoStore {
  todos: Todo[];
}

// Of course, if you don't pass the type,
// `createStore` automatically infers the types from the initial state
export const todoStore = createStore<TodoStore>({
  todos: [],
});
```

> **Caveat** : you should always create a store outside of any React component.

## Live demo

- [Todo app](https://codesandbox.io/p/sandbox/strange-ritchie-5crsmw)
