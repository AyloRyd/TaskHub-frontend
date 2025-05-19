import { createRoute, Link, useNavigate } from "@tanstack/react-router";
import type { AnyRoute } from "@tanstack/react-router";
import { useAppForm } from "../../hooks/use-app-form";
import { z } from "zod";
import { useLogin } from "@/hooks/use-auth";
import axios from "axios";

const loginSchema = z.object({
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
});

const LoginPage = () => {
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const form = useAppForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onBlur: ({ value }) => {
        const errors: { fields: Record<string, string> } = { fields: {} };
        const result = loginSchema.safeParse(value);
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
        loginMutation.mutate(
          { email: value.email, password: value.password },
          {
            onSuccess: () => {
              navigate({ to: "/" });
            },
          }
        );
      },
    },
  });

  const errorMessage = loginMutation.error
    ? axios.isAxiosError(loginMutation.error)
      ? `${loginMutation.error.response?.status ?? ""} ${
          loginMutation.error.response?.data?.description || "Login failed"
        }`
      : "Network error"
    : null;

  return (
    <div className="flex items-center w-100 justify-center min-h-screen">
      <div className="w-full max-w-2xl py-12 px-10 rounded-3xl backdrop-blur-md bg-black border-[1px] border-stone-400">
        <div className="flex flex-col items-start justify-center text-white">
          <h1 className="text-2xl font-bold">Login</h1>
          <h2 className="text-sm">Glad you're back!</h2>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-6 mt-8"
        >
          <form.AppField name="email">
            {(field) => <field.TextField label="" placeholder="Email" />}
          </form.AppField>

          <form.AppField name="password">
            {(field) => <field.PasswordField label="" placeholder="Password" />}
          </form.AppField>

          {errorMessage && <p className="text-red-400">{errorMessage}</p>}

          <div className="mt-8">
            <form.AppForm>
              <form.SubscribeButton
                label={loginMutation.isPending ? "Logging in..." : "Login"}
                disabled={loginMutation.isPending}
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

            <div className="mt-12 w-full flex justify-center text-white">
              <p>Don't have an account?</p>
              <Link
                to="/auth/register"
                className="text-slate-400 font-bold ml-2 hover:underline hover:text-slate-300"
              >
                Register!
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function LoginRoute<TParent extends AnyRoute>(
  parentRoute: TParent
) {
  return createRoute({
    getParentRoute: () => parentRoute,
    path: "/auth/login",
    component: LoginPage,
  });
}
