import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import {
  Link,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import FormSimpleDemo from "./routes/demo.form.simple.tsx";
import FormAddressDemo from "./routes/demo.form.address.tsx";
import TableDemo from "./routes/demo.table.tsx";
import TanStackQueryDemo from "./routes/demo.tanstack-query.tsx";

import LoginRoute from "./routes/auth/login.tsx";
import RegisterRoute from "./routes/auth/register.tsx";
import VerificationCompleteRoute from "./routes/auth/verification-complete.tsx";
import ForgotPasswordRoute from "./routes/auth/forgot-password.tsx";
import ResetPasswordRoute from "./routes/auth/reset-password.tsx";

import AppSidebar from "./components/sidebar/AppSidebar.tsx";

import { ChevronLeft } from "lucide-react";

// import TanStackQueryLayout from "./integrations/tanstack-query/layout.tsx";
import * as TanStackQueryProvider from "./integrations/tanstack-query/root-provider.tsx";

import "./styles.css";
import reportWebVitals from "./reportWebVitals.ts";

import App from "./App.tsx";
import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "./components/Header/Header.tsx";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <SidebarProvider>
        <Outlet />
      </SidebarProvider>
      {/* <TanStackRouterDevtools />
          <TanStackQueryLayout /> */}
    </>
  ),
});

const appLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  component: () => (
    <div className="flex w-full">
      <AppSidebar />
      <div className="flex flex-col w-full h-screen">
        <Header />
        <main className="h-full">
          <Outlet />
        </main>
      </div>
    </div>
  ),
  id: "app-layout",
});

const authLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  component: () => (
    <div
      className="relative flex items-center justify-center h-screen w-screen p-4 text-white"
      style={{
        backgroundImage: 'url("/auth-bg.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Link
        className="absolute p-3 top-4 left-4 bg-black border-[1px] border-stone-400 hover:bg-stone-950 rounded-xl"
        to="/"
      >
        <ChevronLeft size={25} />
      </Link>
      <Outlet />
    </div>
  ),
  id: "auth-layout",
});

const indexRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/",
  component: App,
});

const routeTree = rootRoute.addChildren([
  appLayoutRoute.addChildren([
    indexRoute,
    FormSimpleDemo(appLayoutRoute),
    FormAddressDemo(appLayoutRoute),
    TableDemo(appLayoutRoute),
    TanStackQueryDemo(appLayoutRoute),
  ]),
  authLayoutRoute.addChildren([
    LoginRoute(authLayoutRoute),
    RegisterRoute(authLayoutRoute),
    VerificationCompleteRoute(authLayoutRoute),
    ForgotPasswordRoute(authLayoutRoute),
    ResetPasswordRoute(authLayoutRoute),
  ]),
]);

const router = createRouter({
  routeTree,
  context: {
    ...TanStackQueryProvider.getContext(),
  },
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <TanStackQueryProvider.Provider>
        <RouterProvider router={router} />
      </TanStackQueryProvider.Provider>
    </StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
