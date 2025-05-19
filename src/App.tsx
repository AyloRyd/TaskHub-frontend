import { useCurrentUser } from "./hooks/use-auth";
import { useAuthStore } from "./store/auth";

export default function App() {
  const { isAuthenticated } = useAuthStore();
  const { data: user, isLoading, error } = useCurrentUser();

  return !isAuthenticated ? (
    <p className="flex h-screen w-full items-center justify-center text-2xl font-bold">
      Please log in to view your profile.
    </p>
  ) : isLoading ? (
    <p className="flex h-screen w-full items-center justify-center text-2xl font-bold">
      Loading...
    </p>
  ) : error ? (
    <p className="flex h-screen w-full items-center justify-center text-2xl font-bold text-red-600 text-center px-4">
      Error:{" "}
      {(error as any)?.response?.data?.description || 
        (error as Error).message}
    </p>
  ) : !user ? (
    <p className="flex h-screen w-full items-center justify-center text-2xl font-bold">
      No user found.
    </p>
  ) : (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Welcome, {user?.name}!</h1>
      <p className="mt-2">Email: {user?.email}</p>
      <p>Status: {user?.is_verified ? "Verified" : "Not verified"}</p>
    </div>
  );
}
