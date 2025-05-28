import { useCurrent } from "./hooks/use-auth";
import { useAuthStore } from "./store/auth";
import { LoaderCircle } from 'lucide-react';

export default function App() {
  const { isAuthenticated, user: userData } = useAuthStore();
  const { data: user, isLoading, error } = useCurrent();

  return !isAuthenticated ? (
    <p className="flex h-screen w-full items-center justify-center 
                  text-2xl font-bold text-stone-200 bg-taskhub-light px-12 text-center">
      Please log in to view your profile.
    </p>
  ) : isLoading ? (
    <p className="flex h-screen w-full items-center justify-center text-2xl 
                  font-bold text-stone-200 bg-taskhub-light px-12 text-center">
      <LoaderCircle size={60} className="animate-spin"/>
    </p>
  ) : error ? (
    <p className="flex h-screen w-full items-center justify-center text-2xl 
                  font-bold text-red-400 bg-taskhub-light px-12 text-center">
      Error:{" "}
      {error.response?.data.description}
    </p>
  ) : !user ? (
    <p className="flex h-screen w-full items-center justify-center text-2xl 
                  font-bold text-stone-200 bg-taskhub-light px-12 text-center">
      No user found.
    </p>
  ) : (
    <div className="flex flex-col gap-4 h-screen w-full items-center justify-center 
                    text-2xl font-bold text-stone-200 bg-taskhub-light px-12 text-center">
      <h1 className="text-2xl font-bold">Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>
      <p>Status: {userData?.is_verified ? "Verified" : "Not verified"}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}