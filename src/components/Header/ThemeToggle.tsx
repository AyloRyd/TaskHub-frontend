import useDarkMode from "@/hooks/use-dark-theme";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="flex items-center space-x-3 cursor-pointer">
      <div className="relative flex items-center space-x-2 bg-taskhub-middle rounded-full p-1">
        <div className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 bg-taskhub-dark text-font-primarly">
          <Sun
            size={16}
            className={cn(
              "transition-all duration-300",
              !isDarkMode ? "rotate-0" : "rotate-180"
            )}
          />
        </div>

        <Switch
          checked={isDarkMode}
          onCheckedChange={toggleDarkMode}
          className="data-[state=checked]:bg-taskhub-light data-[state=unchecked]:bg-taskhub-dark"
        />

        <div className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 bg-taskhub-light text-font-primarly">
          <Moon
            size={16}
            className={cn(
              "transition-all duration-300",
              isDarkMode ? "rotate-0" : "-rotate-180"
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default ThemeToggle;
