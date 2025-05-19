import { cn } from "@/lib/utils";

export function ErrorMessages({
  errors,
  className,
}: {
  errors: Array<string | { message: string }>;
  className?: string;
}) {
  return (
    <>
      {errors.map((error) => (
        <div
          key={typeof error === "string" ? error : error.message}
          className={cn("text-red-500 mt-1", className)}
        >
          {typeof error === "string" ? error : error.message}
        </div>
      ))}
    </>
  );
}