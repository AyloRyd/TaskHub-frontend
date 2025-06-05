import { createRoute, Link, useNavigate, Outlet } from "@tanstack/react-router";
import type { AnyRoute } from "@tanstack/react-router";
import { useAppForm } from "@/hooks/use-app-form";
import { z } from "zod";
import { useAuth } from "@/hooks/use-auth";
import EmailLinks from "@/components/auth/EmailLinks";

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

const RegisterFormPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

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
        register.mutate(
          {
            name: value.username,
            email: value.email,
            password: value.password,
          },
          {
            onSuccess: () => {
              navigate({ to: "/auth/register/check-email" });
            },
          }
        );
      },
    },
  });

  const errorMessage = register.error
    ? `${register.error.response?.status ?? ""} ${
        register.error.response?.data.description || "Registration failed"
      }`
    : null;

  return (
    <div className="flex items-center justify-center min-h-screen w-100">
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
          className="mt-8 space-y-6"
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
                label={register.isPending ? "Registering..." : "Register"}
                disabled={register.isPending}
                className={
                  "cursor-pointer w-full mt-2 py-6 text-lg text-white rounded-xl " +
                  "bg-gradient-to-br from-slate-900 to-red-900 " +
                  "bg-[length:200%_200%] bg-[position:0%_0%] " +
                  "hover:bg-[position:100%_100%] " +
                  "transition-all duration-500 ease-in-out " +
                  "font-bold"
                }
              />
            </form.AppForm>

            <div className="flex justify-center w-full mt-12">
              <p>Already have an account?</p>
              <Link
                to="/"
                className="ml-2 font-bold transition-all duration-500 ease-in-out text-slate-500 hover:underline hover:text-slate-400"
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

const CheckEmailPage = () => (
  <EmailLinks label="We've sent you a verification link — please click it to activate your account." />
);

const RegisterLayout = () => <Outlet />;

export default function RegisterRoute<TParent extends AnyRoute>(
  parentRoute: TParent
) {
  const registerRoute = createRoute({
    getParentRoute: () => parentRoute,
    path: "/auth/register",
    component: RegisterLayout,
  });

  const registerFormRoute = createRoute({
    getParentRoute: () => registerRoute,
    path: "/",
    component: RegisterFormPage,
  });

  const checkEmailRoute = createRoute({
    getParentRoute: () => registerRoute,
    path: "check-email",
    component: CheckEmailPage,
  });

  return registerRoute.addChildren([registerFormRoute, checkEmailRoute]);
}
