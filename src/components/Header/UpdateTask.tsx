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
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useAppForm } from "@/hooks/use-app-form";
import { useTasks } from "@/hooks/use-tasks";
import { z } from "zod";
import type { Task, Visibility } from "@/lib/types/tasks";
import { useState } from "react";
import { Edit } from "lucide-react";

const createTaskSchema = z.object({
  name: z
    .string()
    .min(1, "Task name is required.")
    .max(100, "Task name must be at most 100 characters."),
  visibility: z.enum(["Private", "Public", "Paid"], {
    required_error: "Visibility is required.",
  }),
});

const UpdateTask = ({
  task,
  className,
}: {
  task: Task;
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  const { update } = useTasks();

  const form = useAppForm({
    defaultValues: {
      name: task.name,
      visibility: task.visibility as Visibility,
    },
    validators: {
      onBlur: ({ value }) => {
        const errors: { fields: Record<string, string> } = { fields: {} };
        const result = createTaskSchema.safeParse(value);
        if (!result.success) {
          for (const issue of result.error.issues) {
            const field = issue.path[0] as string;
            if (!errors.fields[field]) {
              errors.fields[field] = issue.message;
            }
          }
        }
        return errors;
      },
      onSubmit: async ({ value }) => {
        update.mutate(
          {
            id: task.id,
            name: value.name,
            visibility: value.visibility,
          },
          {
            onSuccess: () => {
              form.reset();
              setOpen(false);
            },
          }
        );
      },
    },
  });

  const errorMessage = update.error
    ? `${update.error.response?.status ?? ""} ${
        update.error.response?.data.description || "Failed to create task"
      }`
    : null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className={
            className
              ? className
              : "justify-start gap-2 h-12 text-lg cursor-pointer rounded-none rounded-t-lg bg-taskhub-middle hover:bg-taskhub-dark text-font-primarly"
          }
        >
          <Edit size={14} />
          Edit Task
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px] rounded-2xl"
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <DialogHeader>
            <DialogTitle>Edit task</DialogTitle>
            <DialogDescription>
              You can edit task name and visibility here.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <form.AppField name="name">
              {(field) => (
                <div className="grid gap-3">
                  <Label htmlFor="task-name">Name</Label>
                  <field.TextField label="" placeholder="Enter task name" />
                </div>
              )}
            </form.AppField>

            <form.AppField name="visibility">
              {(field) => (
                <div className="grid gap-3 mb-4">
                  <Label htmlFor="task-visibility">Visibility</Label>
                  <div onFocus={(e) => e.stopPropagation()}>
                    <Select
                      value={field.state.value ?? ""}
                      onValueChange={(val: string) =>
                        field.handleChange(val as Visibility)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select visibility" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="Private">Private</SelectItem>
                          <SelectItem value="Public">Public</SelectItem>
                          <SelectItem value="Paid">Paid</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  {field.state.meta.errors && (
                    <p className="text-red-400 text-sm">
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                </div>
              )}
            </form.AppField>

            {errorMessage && (
              <p className="text-red-400 text-sm">{errorMessage}</p>
            )}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer"
                disabled={update.isPending}
              >
                Cancel
              </Button>
            </DialogClose>

            <form.AppForm>
              <form.SubscribeButton
                label={update.isPending ? "Updating..." : "Update Task"}
                disabled={update.isPending}
                className="cursor-pointer"
              />
            </form.AppForm>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTask;
