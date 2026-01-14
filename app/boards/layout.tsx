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
    <SidebarProvider defaultOpen={defaultOpen}>
      <CustomSidebarTrigger />
      <AppSidebar />
      <div className="bg-light-grey w-full">
        <BoardHeader />
        <main>{children}</main>
      </div>
    </SidebarProvider>
  );
}
