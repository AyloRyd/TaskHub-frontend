import { Link } from "@tanstack/react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuthStore } from "@/store/auth";
import AppSidebarTrigger from "./AppSidebarTrigger";
import AppSidebarPagesLinksList from "./AppSidebarPagesLinksList";
import ProfileOptionsPopover from "./ProfileOptionsPopover";

export default function AppSidebar() {
  const { isMobile, toggleSidebar } = useSidebar();
  const { isAuthenticated } = useAuthStore();

  return (
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
                  <p className="text-2xl font-bold text-font-primarly p-2">
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
                    className="w-full text-xl flex items-center px-6 gap-4 justify-center py-4 cursor-pointer rounded-xl 
                                 text-font-primarly bg-taskhub-dark hover:bg-taskhub-darker transition-colors duration-200"
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
  );
}
