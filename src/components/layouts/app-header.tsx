import ThemeToggle from "@/components/shared/theme-toggle";
import UserMenu from "@/components/shared/user-menu";

interface AppHeaderProps {
  title?: string;
}

export default function AppHeader({
  title = "Dashboard",
}: AppHeaderProps): React.JSX.Element {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <h1 className="text-xl font-semibold tracking-tight">
        {title}
      </h1>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <UserMenu />
      </div>
    </header>
  );
}
