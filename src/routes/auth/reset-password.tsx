import {
  createRoute,
  type AnyRoute,
  Outlet,
  useNavigate,
  useSearch,
  Link,
} from "@tanstack/react-router";
import { z } from "zod";
import { useAuth } from "@/hooks/use-auth";
import { useAppForm } from "@/hooks/use-app-form";
import { useAuthStore } from "@/store/auth";
import { Button } from "@/components/ui/button";

const registerSchema = z
  .object({
    newPassword: z
      .string()
      .min(1, "Field is required.")
      .min(6, "Password must be at least 6 characters.")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\S]+$/,
        "Password must contain both letters and digits."
      ),
    confirmNewPassword: z.string().min(1, "Field is required."),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match.",
    path: ["confirmNewPassword"],
  });

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const { token } = useSearch({ from: "/auth-layout/auth/reset-password" });
  const { resetPassword } = useAuth();

  const form = useAppForm({
    defaultValues: { newPassword: "", confirmNewPassword: "" },
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
        resetPassword.mutate(
          { password: value.newPassword, token },
          {
            onSuccess: () =>
              navigate({
                to: "/auth/reset-password/success",
                search: { token },
              }),
          }
        );
      },
    },
  });

  const errorMessage = resetPassword.error
    ? `${resetPassword.error.response?.status ?? ""} ${
        resetPassword.error.response?.data.description ||
        "Password resetting failed"
      }`
    : null;

  return (
    <div className="flex items-center justify-center min-h-screen w-100">
      <div className="w-full max-w-2xl py-12 px-10 rounded-3xl backdrop-blur-md bg-black border-[1px] border-stone-400">
        <div className="flex flex-col items-start justify-center text-white">
          <h1 className="text-2xl font-bold">Reset password</h1>
          <h2 className="text-sm">Reset your password with a new one!</h2>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="mt-8 space-y-6"
        >
          <form.AppField name="newPassword">
            {(field) => (
              <field.PasswordField label="" placeholder="New password" />
            )}
          </form.AppField>

          <form.AppField name="confirmNewPassword">
            {(field) => (
              <field.PasswordField
                label=""
                placeholder="Confirm new password"
              />
            )}
          </form.AppField>

          {errorMessage && <p className="text-red-400">{errorMessage}</p>}

          <div className="mt-8">
            <form.AppForm>
              <form.SubscribeButton
                label={resetPassword.isPending ? "Resetting..." : "Reset"}
                disabled={resetPassword.isPending}
                className="cursor-pointer w-full mt-2 py-6 text-lg rounded-xl bg-gradient-to-br from-slate-900 to-red-900 bg-[length:200%_200%] bg-[position:0%_0%] hover:bg-[position:100%_100%] transition-all duration-500 ease-in-out font-bold"
              />
            </form.AppForm>
          </div>
        </form>
      </div>
    </div>
  );
};

const SuccessPage = () => {
  const { isAuthenticated } = useAuthStore();
  return (
    <div className="flex items-center justify-center min-h-screen w-100">
      <div className="w-full max-w-2xl py-12 px-10 rounded-3xl backdrop-blur-md bg-black border-[1px] border-stone-400 text-white">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">Congratulations!</h1>
          <p className="mt-4 text-center text-gray-300">
            You have successfully reset your password!
          </p>
        </div>

        <div className="flex justify-center gap-12 mt-8">
          <Link to={isAuthenticated ? "/" : "/auth/login"} className="w-full">
            <Button className="cursor-pointer w-full mt-2 py-6 text-lg rounded-xl bg-gradient-to-br from-slate-900 to-red-900 bg-[length:200%_200%] bg-[position:0%_0%] hover:bg-[position:100%_100%] transition-all duration-500 ease-in-out font-bold">
              {isAuthenticated ? "Back home" : "Proceed to login"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const ResetPasswordLayout = () => <Outlet />;

export default function ResetPasswordRoute<TParent extends AnyRoute>(
  parentRoute: TParent
) {
  const resetPasswordRoute = createRoute({
    getParentRoute: () => parentRoute,
    path: "/auth/reset-password",
    component: ResetPasswordLayout,
    validateSearch: (search) => ({ token: String(search.token || "") }),
  });

  const formRoute = createRoute({
    getParentRoute: () => resetPasswordRoute,
    path: "/",
    component: ResetPasswordForm,
  });

  const successRoute = createRoute({
    getParentRoute: () => resetPasswordRoute,
    path: "success",
    component: SuccessPage,
  });

  return resetPasswordRoute.addChildren([formRoute, successRoute]);
}
