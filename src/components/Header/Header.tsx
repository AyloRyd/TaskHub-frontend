import { useSidebar } from "../ui/sidebar";
import AppSidebarTrigger from "../sidebar/AppSidebarTrigger";
import ThemeToggle from "./ThemeToggle";
import { Button } from "../ui/button";

const Header = () => {
  const { isMobile, open } = useSidebar();

  return (
    <header className="flex items-center justify-between bg-taskhub-light p-4">
      <div className="flex items-center justify-between gap-4">
        {(isMobile || !open) && <AppSidebarTrigger />}

        <ThemeToggle />
      </div>

      <Button className="bg-taskhub-middle hover:bg-taskhub-dark text-font-primarly cursor-pointer py-6 shadow-none rounded-xl">
        Add new task
      </Button>
    </header>
  );
};

export default Header;
