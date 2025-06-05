import { useSidebar } from "../ui/sidebar";
import AppSidebarTrigger from "../sidebar/AppSidebarTrigger";
import ThemeToggle from "./ThemeToggle";
import { useAuthStore } from "@/store/auth";
import CreateTask from "./CreateTask";

const Header = () => {
  const { isMobile, open } = useSidebar();
  const { isAuthenticated } = useAuthStore();

  return (
    <header className="flex items-center justify-between bg-taskhub-light p-4 relative z-20">
      <div className="flex h-full items-center justify-between gap-4">
        {(isMobile || !open) && <AppSidebarTrigger />}

        <ThemeToggle />
      </div>
      {isAuthenticated && <CreateTask />}
    </header>
  );
};

export default Header;
