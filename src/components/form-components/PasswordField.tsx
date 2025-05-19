import { useFieldContext } from "@/hooks/form-context";
import { useStore } from "@tanstack/react-form";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Eye, EyeOff } from "lucide-react";
import { ErrorMessages } from "./ErrorMessages";

export function PasswordField({
  label,
  placeholder,
  className,
}: {
  label: string;
  placeholder?: string;
  className?: string;
}) {
  const field = useFieldContext<string>();
  const errors = useStore(field.store, (state) => state.meta.errors);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={className}>
      <Label htmlFor={label} className="mb-2 text-xl font-bold block">
        {label}
      </Label>
      <div className="relative">
        <Input
          id={label}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          className="pr-10 border-stone-400"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setShowPassword((prev) => !prev)}
          className="cursor-pointer absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground hover:bg-transparent hover:text-stone-300"
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </Button>
      </div>
      {field.state.meta.isTouched && <ErrorMessages errors={errors} />}
    </div>
  );
}