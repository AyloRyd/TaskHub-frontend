import { Button } from "@/components/ui/button";
import { createRoute, Link, type AnyRoute } from "@tanstack/react-router";

export function VerificationCompletePage() {
  return (
    <div className="flex items-center justify-center min-h-screen w-100">
      <div className="w-full max-w-2xl py-12 px-10 rounded-3xl backdrop-blur-md 
                      bg-black border-[1px] border-stone-400 text-white">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">Congratulations!</h1>
          <p className="mt-4 text-center text-gray-300">
            You have successfully verified your email!
          </p>
        </div>

        <div className="flex justify-center gap-12 mt-8">
          <Link to="/auth/login" className="w-full">
            <Button
              className="
                cursor-pointer w-full mt-2 py-6 text-lg text-white rounded-xl
                bg-gradient-to-br from-slate-900 to-red-900
                bg-[length:200%_200%] bg-[position:0%_0%]
                hover:bg-[position:100%_100%]
                transition-all duration-500 ease-in-out
                font-bold
              "
            >
              Proceed to login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function VerificationCompleteRoute<TParent extends AnyRoute>(
  parentRoute: TParent
) {
  return createRoute({
    getParentRoute: () => parentRoute,
    path: "/auth/verification-complete",
    component: VerificationCompletePage,
  });
}
