import { Link } from "@tanstack/react-router";
import { Home, Search, FileText, Folder, Settings } from "lucide-react";
import { SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { useMatchRoute } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/demo/form/simple", icon: Search, label: "Simple Form" },
  { to: "/demo/form/address", icon: FileText, label: "Address Form" },
  { to: "/demo/table", icon: Folder, label: "TanStack Table" },
  { to: "/demo/tanstack-query", icon: Settings, label: "TanStack Query" },
];

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
                "flex items-center gap-4 px-4 py-6 h-15 text-font-primarly hover:bg-taskhub-dark transition-colors duration-200 rounded-xl",
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

export default AppSidebarPagesLinksList;