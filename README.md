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
  import { createStore } from '@oolong/react'

  const counterStore = createStore(0)

  function App() {
    // subscribe count value
    const count = counterStore()

    return (
      <div>
        counter: {count} 

        <button onClick={() => counterStore.set((prev) => prev + 1)}>
          Increment
        </button>
      </div>
    )
  }
  ```

 - Done!

</details>


## Live demo 

* [Todo store](https://codesandbox.io/p/sandbox/interesting-minsky-2rhcxq)
