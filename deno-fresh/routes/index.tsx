import { Head } from "$fresh/runtime.ts";
import { counterStore } from "../components/Counter.store.ts";
import Counter from "../islands/Counter.tsx";
import Counter2 from "../islands/Counter2.tsx";
import SideLoader from "../islands/SideLoader.tsx";

export default function Home() {
  counterStore.set({
    count1: 3,
    count2: 5,
  }, {
    broadCast: false
  });

  return (
    <>
      <Head>
        <title>Fresh App</title>
      </Head>

      <div class="p-4 mx-auto max-w-screen-md">
        <SideLoader
          initial={{
            count1: 3,
            count2: 5,
          }}
        />
        <img
          src="/logo.svg"
          class="w-32 h-32"
          alt="the fresh logo: a sliced lemon dripping with juice"
        />
        <p class="my-6">
          Welcome to `fresh`. Try updating this message in the
          ./routes/index.tsx file, and refresh.
        </p>
        <Counter />
        <Counter2 />
      </div>
    </>
  );
}
