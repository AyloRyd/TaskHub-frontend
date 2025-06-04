import {
  createRoute,
  type AnyRoute,
  Outlet,
  useNavigate,
} from "@tanstack/react-router";
import { z } from "zod";
import { useEffect, useRef } from "react";
import { useAppForm } from "@/hooks/use-app-form";
import { useForgotPassword } from "@/hooks/use-auth";
import { useAuthStore } from "@/store/auth";
import EmailLinks from "@/components/auth/EmailLinks";

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Field is required.")
    .email("Invalid email address."),
});

const EnterEmailPage = () => {
  const navigate = useNavigate();
  const forgotPasswordMutation = useForgotPassword();
  const { isAuthenticated, user } = useAuthStore();

  const didSendForAuthenticatedUser = useRef(false);

  useEffect(() => {
    if (!didSendForAuthenticatedUser.current && isAuthenticated && user?.email) {
      didSendForAuthenticatedUser.current = true; 
      forgotPasswordMutation
        .mutateAsync({ email: user.email })
        .then(() => {
          navigate({ to: "/auth/forgot-password/check-email" });
        })
    }
  }, [isAuthenticated, user, forgotPasswordMutation, navigate]);

  const form = useAppForm({
    defaultValues: { email: "" },
    validators: {
      onBlur: ({ value }) => {
        const errors: { fields: Record<string, string> } = { fields: {} };
        const result = forgotPasswordSchema.safeParse(value);
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
        forgotPasswordMutation.mutate(
          { email: value.email },
          {
            onSuccess: () => {
              navigate({ to: "/auth/forgot-password/check-email" });
            },
          }
        );
      },
    },
  });

  const errorMessage = forgotPasswordMutation.error
    ? `${forgotPasswordMutation.error.response?.status ?? ""} ${
        forgotPasswordMutation.error.response?.data.description ||
        "Sending link failed"
      }`
    : null;

  return (
    <div className="flex items-center justify-center min-h-screen w-100">
      <div className="w-full max-w-2xl py-12 px-10 rounded-3xl backdrop-blur-md bg-black border-[1px] border-stone-400">
        <div className="flex flex-col items-start justify-center text-white">
          <h1 className="text-2xl font-bold">Enter your email</h1>
          <h2 className="text-sm">
            We'll send you a link to reset your password to your e-mail address!
          </h2>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="mt-8 space-y-6"
        >
          <form.AppField name="email">
            {(field) => <field.TextField label="" placeholder="Email" />}
          </form.AppField>

          {errorMessage && <p className="text-red-400">{errorMessage}</p>}

          <div className="mt-8">
            <form.AppForm>
              <form.SubscribeButton
                label={forgotPasswordMutation.isPending ? "Sending..." : "Send"}
                disabled={forgotPasswordMutation.isPending}
                className={
                  `cursor-pointer w-full mt-2 py-6 text-lg rounded-xl
                 text-white bg-gradient-to-br from-slate-900 to-red-900 
                 bg-[length:200%_200%] bg-[position:0%_0%] hover:bg-[position:100%_100%] 
                 transition-all duration-500 ease-in-out font-bold`
                }
              />
            </form.AppForm>
          </div>
        </form>
      </div>
    </div>
  );
};

const CheckEmailPage = () => (
  <EmailLinks label="We've sent you a link to reset your password to your e-mail address!" />
);

const ForgotPasswordLayout = () => <Outlet />;

export default function ForgotPasswordRoute<TParent extends AnyRoute>(
  parentRoute: TParent
) {
  const forgotPasswordRoute = createRoute({
    getParentRoute: () => parentRoute,
    path: "/auth/forgot-password",
    component: ForgotPasswordLayout,
  });

  const enterEmailRoute = createRoute({
    getParentRoute: () => forgotPasswordRoute,
    path: "/",
    component: EnterEmailPage,
  });

  const checkEmailRoute = createRoute({
    getParentRoute: () => forgotPasswordRoute,
    path: "check-email",
    component: CheckEmailPage,
  });

  return forgotPasswordRoute.addChildren([enterEmailRoute, checkEmailRoute]);
}