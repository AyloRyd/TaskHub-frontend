import { createRoute, useParams, type AnyRoute } from "@tanstack/react-router";

const TaskDetailPage = () => {
  const { id } = useParams({ strict: false }) as { id: string };
  return (
    <div className="h-full w-full bg-taskhub-light flex items-center justify-center text-2xl font-bold">
      Task ID: {id}
    </div>
  );
};

export default function TaskDetailRoute<TParent extends AnyRoute>(
  parentRoute: TParent
) {
  return createRoute({
    getParentRoute: () => parentRoute,
    path: "/task/$id",
    component: TaskDetailPage,
  });
}
