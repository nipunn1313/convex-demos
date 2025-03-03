import { ConvexClient, useQuery } from "@convex-dev/react";

import convexConfig from "../convex.json";
const convex = new ConvexClient(convexConfig.origin);

export default function App() {
  // Watch the results of the Convex function `getCounter` and call
  // `setCounter` on the return value.
  const counter = useQuery(convex.query("getCounter")) ?? 0;

  function incrementCounter(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    // Execute the Convex function `incrementCounter` as a transaction
    // that updates the counter value.
    return convex.transaction("incrementCounter").call(1);
  }

  return (
    <main>
      <div>Here's the counter:</div>
      <div>{counter}</div>
      <button onClick={incrementCounter}>Add One!</button>
    </main>
  );
}
