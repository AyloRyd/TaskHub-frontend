import { useFormContext } from "../../hooks/form-context";

import { Button } from "@/components/ui/button";

export function SubscribeButton({
  label,
  className,
  disabled,
}: {
  label?: string;
  className?: string;
  disabled?: boolean;
}) {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button type="submit" disabled={disabled ?? isSubmitting} className={className}>
          {label ?? "Submit"}
        </Button>
      )}
    </form.Subscribe>
  );
}