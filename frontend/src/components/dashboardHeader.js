import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

const DashboardHeader = () => {
  return (
    <header className="w-full container mx-auto flex items-center justify-end pl-20 pr-4 py-3 rounded-xl backdrop-blur-md">
      <div className="flex gap-2">
        <ModeToggle />

        <Button onClick={() => {}} className="flex items-end">
          Logout
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;
