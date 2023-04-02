import { PageProps } from "$fresh/server.ts";

export default function Page(props: PageProps) {
  return <div>You are on the page '{props.url.href}'.</div>;
}
