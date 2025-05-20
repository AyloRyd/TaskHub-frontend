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
import ConfirmEmailRoute from "./routes/auth/confirm-email.tsx";

import AppSidebar from "./components/sidebar/AppSidebar.tsx";

import { ChevronLeft } from "lucide-react";

// import TanStackQueryLayout from "./integrations/tanstack-query/layout.tsx";
import * as TanStackQueryProvider from "./integrations/tanstack-query/root-provider.tsx";

import "./styles.css";
import reportWebVitals from "./reportWebVitals.ts";

import App from "./App.tsx";
import { SidebarProvider } from "@/components/ui/sidebar";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      {/* <TanStackRouterDevtools />
          <TanStackQueryLayout /> */}
    </>
  ),
});

// const rootRoute = createRootRoute({
//   component: () => (
//     <>
//       <div className="relative">
//         <SidebarProvider>
//           <AppSidebar />
//           <Outlet />
//           {/* <TanStackRouterDevtools />
//           <TanStackQueryLayout /> */}
//         </SidebarProvider>
//       </div>
//     </>
//   ),
// });

const appLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  component: () => (
    <div className="relative">
      <SidebarProvider>
        <AppSidebar />
        <Outlet />
      </SidebarProvider>
    </div>
  ),
  id: "app-layout",
});

const authLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  component: () => (
    <div
      className="relative h-screen p-4 text-white flex items-center justify-center"
      style={{
        backgroundImage: 'url("/auth-bg.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Link
        className="absolute top-4 left-4 bg-taskhub-light hover:bg-taskhub-middle rounded-xl p-3"
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
    ConfirmEmailRoute(authLayoutRoute),
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
