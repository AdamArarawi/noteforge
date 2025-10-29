import { AppSidebar } from "@/components/app-sidebar";
import { AppSidebarSkeleton } from "@/components/app-sidebar-skeleton";
import { SidebarProvider } from "@/components/ui/sidebar";
import React, { Suspense } from "react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Suspense
        fallback={
          <div>
            <AppSidebarSkeleton />
          </div>
        }
      >
        <AppSidebar />
      </Suspense>
      <main className="flex-1 ">{children}</main>
    </SidebarProvider>
  );
}
