import { PanelLeft } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface AppSidebarTriggerProps
  extends React.HTMLAttributes<HTMLButtonElement> {}

const AppSidebarTrigger = ({ className, ...props }: AppSidebarTriggerProps) => {
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

export default AppSidebarTrigger;
