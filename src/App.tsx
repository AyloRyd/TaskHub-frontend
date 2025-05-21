import { useCurrent } from "./hooks/use-auth";
import { useAuthStore } from "./store/auth";
import { LoaderCircle } from 'lucide-react';

export default function App() {
  const { isAuthenticated } = useAuthStore();
  const { data: user, isLoading, error } = useCurrent();

  return !isAuthenticated ? (
    <p className="flex h-screen w-full items-center justify-center text-2xl font-bold text-stone-200 bg-taskhub-light px-12 text-center">
      Please log in to view your profile.
    </p>
  ) : isLoading ? (
    <p className="flex h-screen w-full items-center justify-center text-2xl font-bold text-stone-200 bg-taskhub-light px-12 text-center">
      <LoaderCircle size={60} className="animate-spin"/>
    </p>
  ) : error ? (
    <p className="flex h-screen w-full items-center justify-center text-2xl font-bold text-red-400 bg-taskhub-light px-12 text-center">
      Error:{" "}
      {error.response?.data.description}
    </p>
  ) : !user ? (
    <p className="flex h-screen w-full items-center justify-center text-2xl font-bold text-stone-200 bg-taskhub-light px-12 text-center">
      No user found.
    </p>
  ) : (
    <div className="flex flex-col gap-4 h-screen w-full items-center justify-center text-2xl font-bold text-stone-200 bg-taskhub-light px-12 text-center">
      <h1 className="text-2xl font-bold">Welcome, {user?.name}!</h1>
      <p>Email: {user?.email}</p>
      <p>Status: {user?.is_verified ? "Verified" : "Not verified"}</p>
    </div>
  );
}

// import React, { useState } from 'react';
// import axios from 'axios';

// // Axios instance with baseURL and credentials
// const api = axios.create({
//   baseURL: 'https://taskhub.linerds.us/api',
//   withCredentials: true, // Send cookies
// });

// const App: React.FC = () => {
//   const [user, setUser] = useState<any>(null);
//   const [error, setError] = useState<string | null>(null);

//   const handleLogin = async () => {
//     setError(null);
//     setUser(null);

//     try {
//       // Step 1: Login
//       await axios.post('/api/auth/login', {
//         email: 'ayloryd@proton.me',
//         password: 'aaa111',
//       });

//       // Step 2: Get current user
//       const res = await axios.get('/api/auth/current');
//       setUser(res.data);
//     } catch (err: any) {
//       setError(err?.response?.data?.message || 'Login failed');
//     }
//   };

//   return (
//     <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
//       <h1>Quick Login Test</h1>
//       <button onClick={handleLogin}>Login</button>

//       {error && (
//         <div style={{ color: 'red', marginTop: '1rem' }}>
//           <strong>Error:</strong> {error}
//         </div>
//       )}

//       {user && (
//         <div style={{ marginTop: '1rem' }}>
//           <h2>Logged in as:</h2>
//           <pre>{JSON.stringify(user, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;
