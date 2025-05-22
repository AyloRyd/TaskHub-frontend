import { Button } from "@/components/ui/button";
import { createRoute, type AnyRoute } from "@tanstack/react-router";
import protonImg from "/proton.png";
import gmailImg from "/gmail.png";
import { z } from "zod";
import { useAppForm } from "@/hooks/use-app-form";
import { useForgotPassword } from "@/hooks/use-auth";
import { useSteps } from "@/hooks/use-steps";

const ForgotPassword = () => {
  const { step, nextStep } = useSteps(2);

  return (
    <>
      {step === 1 ? (
        <EnterEmail nextStep={nextStep}/>
      ) : (
        <CheckEmail />
      )}
    </>
  );
};

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Field is required.")
    .email("Invalid email address."),
});

const EnterEmail = ({ nextStep }: { nextStep: () => void }) => {
  const forgotPasswordMutation = useForgotPassword();

  const form = useAppForm({
    defaultValues: {
      email: "",
    },
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
        nextStep();
        forgotPasswordMutation.mutate({ email: value.email });
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
    <div className="flex items-center w-100 justify-center min-h-screen">
      <div className="w-full max-w-2xl py-12 px-10 rounded-3xl backdrop-blur-md bg-black border-[1px] border-stone-400">
        <div className="flex flex-col items-start justify-center text-white">
          <h1 className="text-2xl font-bold">Enter your email</h1>
          <h2 className="text-sm">
            We'll sent you a link to reset your password to your e-mail
            adress!
          </h2>
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

          {errorMessage && <p className="text-red-400">{errorMessage}</p>}

          <div className="mt-8">
            <form.AppForm>
              <form.SubscribeButton
                label={
                  forgotPasswordMutation.isPending ? "Sending..." : "Send"
                }
                disabled={forgotPasswordMutation.isPending}
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
          </div>
        </form>
      </div>
    </div>
  );
};

const CheckEmail = () => {
  return (
    <div className="flex items-center w-100 justify-center min-h-screen">
      <div className="w-full max-w-2xl py-12 px-10 rounded-3xl backdrop-blur-md bg-black border-[1px] border-stone-400 text-white">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">Check your email</h1>
          <p className="text-center mt-4 text-gray-300">
            We've sent you a link to reset your password to your e-mail adress!
          </p>
        </div>

        <div className="mt-8 flex justify-center gap-12">
          <Button
            onClick={() => window.open("https://mail.google.com", "_blank")}
            className="
                  cursor-pointer py-10 w-25 text-lg rounded-xl
                  bg-gradient-to-br from-slate-900 to-red-900
                  bg-[length:200%_200%] bg-[position:0%_0%]
                  hover:bg-[position:100%_100%]
                  transition-all duration-500 ease-in-out
                  font-bold
                "
          >
            <img src={gmailImg} alt="" className="h-10" />
          </Button>
          <Button
            onClick={() => window.open("https://mail.proton.me", "_blank")}
            className="
                  cursor-pointer py-10 w-25 text-lg rounded-xl
                  bg-gradient-to-br from-slate-900 to-red-900
                  bg-[length:200%_200%] bg-[position:0%_0%]
                  hover:bg-[position:100%_100%]
                  transition-all duration-500 ease-in-out
                  font-bold
                "
          >
            <img src={protonImg} alt="" className="h-15" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function ForgotPasswordRoute<TParent extends AnyRoute>(
  parentRoute: TParent
) {
  return createRoute({
    getParentRoute: () => parentRoute,
    path: "/auth/forgot-password",
    component: ForgotPassword,
  });
}
