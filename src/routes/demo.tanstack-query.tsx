import { createRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import type { AnyRoute } from "@tanstack/react-router";

function TanStackQueryDemo() {
  const { data } = useQuery({
    queryKey: ["people"],
    queryFn: () =>
      Promise.resolve([{ name: "John Doe" }, { name: "Jane Doe" }]),
    initialData: [],
  });

  return (
    <div className="p-4 w-full mt-15">
      <h1 className="text-2xl mb-4">People list</h1>
      <ul>
        {data.map((person) => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default function DemoTanStackQueryRoute<TParent extends AnyRoute>(
  parentRoute: TParent
) {
  return createRoute({
    getParentRoute: () => parentRoute,
    path: "/demo/tanstack-query",
    component: TanStackQueryDemo,
  });
}
