import { ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";
import { MobileNav } from "./MobileNav";

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
}

export function DashboardLayout({ children, title }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop sidebar */}
      <AppSidebar />

      {/* Main content area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Mobile top bar */}
        <MobileNav />

        {/* Desktop header */}
        <AppHeader title={title} />

        {/* Page content */}
        <main
          className="flex-1 overflow-y-auto pb-20 lg:pb-0"
          id="main-content"
        >
          <div className="h-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
