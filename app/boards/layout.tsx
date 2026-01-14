import { cookies } from "next/headers";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { BoardHeader } from "@/features/boards/components/board-header";
import { CustomSidebarTrigger } from "@/components/layout/custom-sidebar-trigger";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      className="[--sidebar-width:16.25rem] lg:[--sidebar-width:18.75rem]"
    >
      <CustomSidebarTrigger />
      <AppSidebar />
      <div className="bg-light-grey dark:bg-very-dark-grey w-full">
        <BoardHeader />
        {children}
      </div>
    </SidebarProvider>
  );
}
