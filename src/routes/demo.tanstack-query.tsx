import { createRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import type { AnyRoute } from "@tanstack/react-router";

function TanStackQueryDemo() {
  const { data: _ } = useQuery({
    queryKey: ["people"],
    queryFn: () =>
      Promise.resolve([{ name: "John Doe" }, { name: "Jane Doe" }]),
    initialData: [],
  });

  return (
    <div className="flex h-screen w-full items-center justify-center text-2xl font-bold text-stone-200 bg-taskhub-light"></div>
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
