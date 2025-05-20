import { createRoute, useNavigate, type AnyRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-auth";
import { useMutation } from "@tanstack/react-query";

export function ConfirmEmailPage() {
  const navigate = useNavigate();
  const { data: user, refetch } = useCurrentUser();

  const { mutate: checkVerification, error, isError, isPending } = useMutation({
    mutationFn: async () => {
      await refetch();
      
      if (!user?.is_verified) {
        throw new Error("You must verify email to continue.");
      }
      
      return true;
    },
    onSuccess: () => {
      navigate({ to: "/auth/login" });
    }
  });

  return (
    <div className="flex items-center w-100 justify-center min-h-screen">
      <div className="w-full max-w-2xl py-12 px-10 rounded-3xl backdrop-blur-md bg-black border-[1px] border-stone-400 text-white">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">Check your email</h1>
          <p className="text-center mt-4 text-gray-300">
            We've sent you a verification link — please click it to activate your
            account.
          </p>
        </div>
        
        {isError && (
          <div className="text-red-400 mt-8 text-center">
            {error?.message || "An error occurred"}
          </div>
        )}
        
        <div className="mt-8 flex justify-center">
          <Button
            onClick={() => checkVerification()}
            disabled={isPending}
            className="
              cursor-pointer w-full py-6 text-lg rounded-xl
              bg-gradient-to-br from-slate-900 to-red-900
              bg-[length:200%_200%] bg-[position:0%_0%]
              hover:bg-[position:100%_100%]
              transition-all duration-500 ease-in-out
              font-bold
            "
          >
            {isPending ? "Checking..." : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmEmailRoute<TParent extends AnyRoute>(
  parentRoute: TParent
) {
  return createRoute({
    getParentRoute: () => parentRoute,
    path: "/auth/confirm-email",
    component: ConfirmEmailPage,
  });
}