import { createRoute, Link, type AnyRoute } from "@tanstack/react-router";

export function VerificationComplete() {
  return (
    <div className="flex items-center w-100 justify-center min-h-screen">
      <div className="w-full max-w-2xl py-12 px-10 rounded-3xl backdrop-blur-md bg-black border-[1px] border-stone-400 text-white">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">Congratulations!</h1>
          <p className="text-center mt-4 text-gray-300">
            You have successfully verified your email!
          </p>
        </div>

        <div className="mt-8 flex justify-center gap-12">
          <Link
            to="/auth/login"
            className="
              cursor-pointer py-4 text-center w-full text-lg rounded-xl
              bg-gradient-to-br from-slate-900 to-red-900
              bg-[length:200%_200%] bg-[position:0%_0%]
              hover:bg-[position:100%_100%]
              transition-all duration-500 ease-in-out
              font-bold
            "
          >
            Proceed to login
          </Link>
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
