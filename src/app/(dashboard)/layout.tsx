import AppShell from "@/components/layouts/app-shell";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps): React.JSX.Element {
  return <AppShell>{children}</AppShell>;
}
