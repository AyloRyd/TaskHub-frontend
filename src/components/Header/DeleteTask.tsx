import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTasks } from "@/hooks/use-tasks";
import type { Task } from "@/lib/types/tasks";

const DeleteTask = ({ task }: { task: Task }) => {
  const {
    remove: { mutate: remove },
  } = useTasks();

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button
            size="sm"
            className="justify-start gap-2 h-12 w-full text-lg text-red-600 hover:text-red-70
                       cursor-pointer rounded-none rounded-b-lg bg-taskhub-middle hover:bg-taskhub-dark"
          >
            <Trash2 size={14} />
            Delete Task
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] rounded-2xl">
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete task?</DialogTitle>
            <DialogDescription>
              This action is irreversible and can not be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer">
                Cancel
              </Button>
            </DialogClose>
            <Button
              variant="outline"
              type="submit"
              className="text-red-600 hover:text-red-70 cursor-pointer"
              onClick={() => remove({ id: task.id })}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default DeleteTask;
