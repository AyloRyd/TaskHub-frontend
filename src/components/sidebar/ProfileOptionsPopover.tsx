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
import { useAuth } from "@/hooks/use-auth";

const ProfileOptionsPopover = () => {
  const { isMobile, toggleSidebar } = useSidebar();
  const { user } = useAuthStore();
  const {
    logout: { mutate: logout },
    deleteAccount: { mutate: deleteAccount, error: deleteError },
  } = useAuth();

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
          "border-none shadow-none rounded-xl p-0 flex flex-col gap-2 bg-taskhub-dark mb-3",
          isMobile ? "w-63" : "w-55"
        )}
      >
        <Link
          to="/auth/forgot-password"
          onClick={() => {
            if (isMobile) toggleSidebar();
          }}
          className="px-4 py-4 rounded-t-xl transition-colors duration-200 text-font-primarly bg-taskhub-dark hover:bg-taskhub-darker"
        >
          Reset password
        </Link>
        <Link
          to="/"
          onClick={() => {
            logout();
            if (isMobile) toggleSidebar();
          }}
          className="px-4 py-4 transition-colors duration-200 text-font-primarly bg-taskhub-dark hover:bg-taskhub-darker"
        >
          Logout
        </Link>
        <Link
          to="/"
          onClick={() => {
            deleteAccount();
            if (deleteError) {
              alert(deleteError.message);
            }
            if (isMobile) toggleSidebar();
          }}
          className="px-4 py-4 transition-colors duration-200 text-font-primarly bg-taskhub-dark hover:bg-taskhub-darker rounded-b-xl"
        >
          Delete account
        </Link>
      </PopoverContent>
    </Popover>
  );
};

export default ProfileOptionsPopover;
