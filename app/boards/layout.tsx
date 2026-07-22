import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { BoardHeader } from "@/features/boards/components/board-header";
import { CustomSidebarTrigger } from "@/components/layout/custom-sidebar-trigger";
import { getCurrentUser } from "@/features/auth/actions";

export default async function DashboardLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/signin");
  }

  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      className="[--sidebar-width:16.25rem] lg:[--sidebar-width:18.75rem]"
    >
      <CustomSidebarTrigger />
      <AppSidebar />
      <div className="bg-light-grey dark:bg-very-dark-grey flex min-w-0 flex-1 flex-col">
        <BoardHeader />
        {children}
        {modal}
      </div>
    </SidebarProvider>
  );
}
