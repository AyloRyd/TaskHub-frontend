import { Link } from "@tanstack/react-router";
import {
  Home,
  Search,
  FileText,
  Folder,
  Settings,
  PanelLeft,
  ChevronDown,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMatchRoute } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth";
import { useLogout } from "@/hooks/use-auth";

const sidebarItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/demo/form/simple", icon: Search, label: "Simple Form" },
  { to: "/demo/form/address", icon: FileText, label: "Address Form" },
  { to: "/demo/table", icon: Folder, label: "TanStack Table" },
  { to: "/demo/tanstack-query", icon: Settings, label: "TanStack Query" },
];

interface SidebarTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {}

const AppSidebarTrigger = ({ className, ...props }: SidebarTriggerProps) => {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      onClick={toggleSidebar}
      className={cn(
        "cursor-pointer p-3 rounded-xl bg-taskhub-middle hover:bg-taskhub-dark text-stone-200 transition-colors duration-200",
        className
      )}
      {...props}
    >
      <PanelLeft size={25} />
    </button>
  );
};

const AppSidebarPagesLinksList = () => {
  const matchRoute = useMatchRoute();
  const { isMobile, toggleSidebar } = useSidebar();

  return (
    <>
      {sidebarItems.map(({ to, icon: Icon, label }) => {
        let isActive = matchRoute({ to: to, fuzzy: false });
        return (
          <SidebarMenuItem key={to}>
            <Link
              to={to}
              onClick={() => {
                if (isMobile) toggleSidebar();
              }}
              className={cn(
                "flex items-center gap-4 px-4 py-6 h-15 text-stone-200 hover:bg-taskhub-dark transition-colors duration-200 rounded-xl",
                isActive ? "bg-taskhub-dark" : "bg-taskhub-middle"
              )}
            >
              <Icon size={25} />
              <span className="text-lg">{label}</span>
            </Link>
          </SidebarMenuItem>
        );
      })}
    </>
  );
};

const ProfileOptionsPopover = () => {
  const { isMobile, toggleSidebar } = useSidebar();
  const { user } = useAuthStore();
  const { mutate: logout } = useLogout();

  return (
    <Popover>
      <PopoverTrigger className="w-full flex items-center gap-4 justify-between h-[5rem] px-6 cursor-pointer rounded-xl text-sm text-stone-200 bg-taskhub-dark hover:bg-taskhub-darker transition-colors duration-200">
        <div className="flex items-start flex-col justify-center">
          <p className="font-bold">{user?.name}</p>
          <p className="text-stone-500">{user?.email}</p>
        </div>
        <ChevronDown size={20} />
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          "border-none shadow-none rounded-xl p-3 flex flex-col gap-2 bg-taskhub-dark mb-3",
          isMobile ? "w-63" : "w-55"
        )}
      >
        <Link
          to="/"
          onClick={() => {
            if (isMobile) toggleSidebar();
          }}
          className="text-stone-200 py-4 bg-taskhub-dark hover:bg-taskhub-darker transition-colors duration-200 rounded-xl px-4 py-2"
        >
          Profile
        </Link>
        <Link
          to="/"
          onClick={() => {
            logout();
            if (isMobile) toggleSidebar();
          }}
          className="text-stone-200 py-4 bg-taskhub-dark hover:bg-taskhub-darker transition-colors duration-200 rounded-xl px-4 py-2"
        >
          Logout
        </Link>
      </PopoverContent>
    </Popover>
  );
};

export default function AppSidebar() {
  const { open, isMobile, toggleSidebar } = useSidebar();
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="relative">
      <Sidebar side="left" className="h-screen border-none">
        <SidebarContent className="h-full bg-taskhub-middle flex flex-col p-2 justify-between">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem className="flex items-center justify-between">
                  <Link
                    to="/"
                    onClick={() => {
                      if (isMobile) toggleSidebar();
                    }}
                  >
                    <p className="text-2xl font-bold text-stone-200 p-2">
                      TaskHub
                    </p>
                  </Link>
                  <AppSidebarTrigger />
                </SidebarMenuItem>
                <SidebarMenuItem className="flex flex-col gap-3 mt-3">
                  <AppSidebarPagesLinksList />
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  {isAuthenticated ? (
                    <ProfileOptionsPopover />
                  ) : (
                    <Link
                      to="/auth/login"
                      onClick={() => {
                        if (isMobile) toggleSidebar();
                      }}
                      className="w-full text-xl flex items-center px-6 gap-4 justify-center py-4 cursor-pointer rounded-xl text-stone-200 bg-taskhub-dark hover:bg-taskhub-darker transition-colors duration-200"
                    >
                      Login
                    </Link>
                  )}
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      {(isMobile || !open) && (
        <AppSidebarTrigger className="absolute top-0 left-0 z-10 m-4" />
      )}
    </div>
  );
}
