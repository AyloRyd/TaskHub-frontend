import { createRoute, Link, useNavigate } from "@tanstack/react-router";
import type { AnyRoute } from "@tanstack/react-router";
import { useAppForm } from "../../hooks/use-app-form";
import { z } from "zod";
import { useAuth } from "@/hooks/use-auth";

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
  const {
    login,
    oauth2: { mutate: oauth2 },
  } = useAuth();

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
        login.mutate(
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

  const errorMessage = login.error
    ? `${login.error.response?.status ?? ""} ${
        login.error.response?.data.description || "Login failed"
      }`
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

          <div className="mt-6 w-full flex justify-center text-white">
            <Link
              to="/auth/forgot-password"
              className="text-slate-500 font-bold ml-2 hover:underline hover:text-slate-400 transition-all duration-500 ease-in-out"
            >
              Forgot password?
            </Link>
          </div>

          <div className="mt-8">
            <form.AppForm>
              <form.SubscribeButton
                label={login.isPending ? "Logging in..." : "Login"}
                disabled={login.isPending}
                className="
                  cursor-pointer w-full mt-2 py-6 text-lg text-white rounded-xl
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
                className="text-slate-500 font-bold ml-2 hover:underline hover:text-slate-400 transition-all duration-500 ease-in-out"
              >
                Register!
              </Link>
            </div>

            <div className="mt-4 w-full flex justify-center text-white">
              <button
                type="button"
                className="cursor-pointer text-slate-500 font-bold ml-2 hover:underline hover:text-slate-400 transition-all duration-500 ease-in-out"
                onClick={() => oauth2()}
              >
                Login with Google
              </button>
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
