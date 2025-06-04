import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth";
import { useLogout, useDelete } from "@/hooks/use-auth";

const ProfileOptionsPopover = () => {
  const { isMobile, toggleSidebar } = useSidebar();
  const { user } = useAuthStore();
  const { mutate: logout } = useLogout();
  const { mutate: deleteAccount } = useDelete();

  return (
    <Popover>
      <PopoverTrigger
        className="w-full flex items-center gap-4 justify-between h-[5rem] px-6 cursor-pointer rounded-xl text-sm text-font-primarly 
                   bg-taskhub-dark hover:bg-taskhub-darker transition-colors duration-200"
      >
        <div className="flex flex-col items-start justify-center">
          <p className="font-bold">{user?.name}</p>
          <p className="text-font-secondary">{user?.email}</p>
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
          className="px-4 py-4 transition-colors duration-200 text-font-primarly bg-taskhub-dark hover:bg-taskhub-darker rounded-xl"
        >
          Profile
        </Link>
        <Link
          to="/auth/forgot-password"
          onClick={() => {
            if (isMobile) toggleSidebar();
          }}
          className="px-4 py-4 transition-colors duration-200 text-font-primarly bg-taskhub-dark hover:bg-taskhub-darker rounded-xl"
        >
          Reset password
        </Link>
        <Link
          to="/"
          onClick={() => {
            logout();
            if (isMobile) toggleSidebar();
          }}
          className="px-4 py-4 transition-colors duration-200 text-font-primarly bg-taskhub-dark hover:bg-taskhub-darker rounded-xl"
        >
          Logout
        </Link>
        <Link
          to="/"
          onClick={() => {
            deleteAccount();
            if (isMobile) toggleSidebar();
          }}
          className="px-4 py-4 transition-colors duration-200 text-font-primarly bg-taskhub-dark hover:bg-taskhub-darker rounded-xl"
        >
          Delete account
        </Link>
      </PopoverContent>
    </Popover>
  );
};

export default ProfileOptionsPopover;
