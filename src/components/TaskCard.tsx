import type { Task } from "@/lib/types/tasks";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import UpdateTask from "@/components/Header/UpdateTask";
import DeleteTask from "@/components/Header/DeleteTask";
import { MoreVertical } from "lucide-react";
import { Link } from "@tanstack/react-router";

function TaskCard({
  task,
  showOptions = true,
}: {
  task: Task;
  showOptions?: boolean;
}) {
  const getVisibilityColor = (visibility: Task["visibility"]) => {
    switch (visibility) {
      case "Public":
        return "bg-green-200 text-green-800 border-green-200";
      case "Private":
        return "bg-blue-200 text-blue-800 border-blue-200";
      case "Paid":
        return "bg-yellow-200 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-200 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="group relative bg-taskhub-dark border-2 border-taskhub-dark/20 rounded-2xl p-6 transition-all duration-300 cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <Link to="/task/$id" params={{ id: task.id.toString() }}>
            <h3 className="text-xl font-bold text-font-primarly mb-3 leading-tight truncate hover:underline">
              {task.name}
            </h3>
          </Link>
        </div>

        {showOptions && (
          <div className="transition-opacity duration-200">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  size="sm"
                  className="h-8 w-8 p-0 cursor-pointer bg-taskhub-middle hover:bg-taskhub-light"
                >
                  <MoreVertical size={16} className="text-font-secondary" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-48 p-0 rounded-xl border-taskhub-light border-[2px]"
                align="end"
              >
                <div className="grid">
                  <UpdateTask task={task} />
                  <DeleteTask task={task} />
                </div>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <span
          className={`inline-flex px-4 py-2 rounded-xl text-sm font-semibold ${getVisibilityColor(
            task.visibility
          )}`}
        >
          {task.visibility}
        </span>

        <span className="text-xs text-font-secondary/60 font-mono">
          #{task.id}
        </span>
      </div>
    </div>
  );
}

export default TaskCard;
