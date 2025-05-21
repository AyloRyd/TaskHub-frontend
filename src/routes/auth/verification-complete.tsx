import { createRoute, type AnyRoute } from "@tanstack/react-router";

export function VerificationComplete() {
  return (
    <div className="flex items-center w-100 justify-center min-h-screen">
      <div className="w-full max-w-2xl py-12 px-10 rounded-3xl backdrop-blur-md bg-black border-[1px] border-stone-400 text-white">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">Check your email</h1>
          <p className="text-center mt-4 text-gray-300">
            We've sent you a verification link — please click it to activate
            your account.
          </p>
        </div>

        <div className="mt-8 flex justify-center gap-12">
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
    path: "/auth/verification-complete",
    component: VerificationComplete,
  });
}