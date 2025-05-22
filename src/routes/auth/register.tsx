import { createRoute, Link, useNavigate } from "@tanstack/react-router";
import type { AnyRoute } from "@tanstack/react-router";
import { useAppForm } from "../../hooks/use-app-form";
import { z } from "zod";
import { useRegister } from "../../hooks/use-auth";

const registerSchema = z
  .object({
    username: z.string().min(1, "Field is required."),
    email: z
      .string()
      .min(1, "Field is required.")
      .email("Invalid email address."),
    password: z
      .string()
      .min(1, "Field is required.")
      .min(6, "Password must be at least 6 characters.")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\S]+$/,
        "Password must contain both letters and digits."
      ),
    confirmPassword: z.string().min(1, "Field is required."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

const RegisterPage = () => {
  const navigate = useNavigate();
  const registerMutation = useRegister();

  const form = useAppForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onBlur: ({ value }) => {
        const errors: { fields: Record<string, string> } = { fields: {} };
        const result = registerSchema.safeParse(value);
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
        registerMutation.mutate(
          {
            name: value.username,
            email: value.email,
            password: value.password,
          },
          {
            onSuccess: () => {
              navigate({ to: "/auth/confirm-email" });
            },
          }
        );
      },
    },
  });

  const errorMessage = registerMutation.error
  ? `${registerMutation.error.response?.status ?? ""} ${
      registerMutation.error.response?.data.description || "Registration failed"
    }`
  : null;

  return (
    <div className="flex items-center w-100 justify-center min-h-screen">
      <div className="w-full max-w-2xl py-12 px-10 rounded-3xl backdrop-blur-md bg-black border-[1px] border-stone-400">
        <div className="flex flex-col items-start justify-center text-white">
          <h1 className="text-2xl font-bold">Register</h1>
          <h2 className="text-sm">Create your account!</h2>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-6 mt-8"
        >
          <form.AppField name="username">
            {(field) => <field.TextField label="" placeholder="Username" />}
          </form.AppField>

          <form.AppField name="email">
            {(field) => <field.TextField label="" placeholder="Email" />}
          </form.AppField>

          <form.AppField name="password">
            {(field) => <field.PasswordField label="" placeholder="Password" />}
          </form.AppField>

          <form.AppField name="confirmPassword">
            {(field) => (
              <field.PasswordField label="" placeholder="Confirm password" />
            )}
          </form.AppField>

          {errorMessage && <p className="text-red-400">{errorMessage}</p>}

          <div className="mt-8">
            <form.AppForm>
              <form.SubscribeButton
                label={
                  registerMutation.isPending ? "Registering..." : "Register"
                }
                disabled={registerMutation.isPending}
                className="
                  cursor-pointer w-full mt-2 py-6 text-lg rounded-xl
                  bg-gradient-to-br from-slate-900 to-red-900
                  bg-[length:200%_200%] bg-[position:0%_0%]
                  hover:bg-[position:100%_100%]
                  transition-all duration-500 ease-in-out
                  font-bold
                "
              />
            </form.AppForm>

            <div className="mt-12 w-full flex justify-center">
              <p>Already have an account?</p>
              <Link
                to="/auth/login"
                className="text-slate-500 font-bold ml-2 hover:underline hover:text-slate-400 transition-all duration-500 ease-in-out"
              >
                Login!
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function RegisterRoute<TParent extends AnyRoute>(
  parentRoute: TParent
) {
  return createRoute({
    getParentRoute: () => parentRoute,
    path: "/auth/register",
    component: RegisterPage,
  });
}
