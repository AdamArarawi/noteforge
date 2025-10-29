import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { getNotebooks } from "@/server/notebooks";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";
import { SidebarData } from "./sidebar-data";
import { SearchForm } from "./search-form";

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const notebooks = await getNotebooks();

  const data = {
    versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
    navMain: [
      ...(notebooks.notebooksByUser?.map((notebook) => ({
        id: notebook.id,
        title: notebook.name,
        url: `/dashboard/notebook/${notebook.id}`,
        items: notebook.notes.map((note) => ({
          title: note.title,
          url: `/dashboard/notebook/${notebook.id}/note/${note.id}`,
        })),
      })) ?? []),
    ],
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader className="overflow-hidden transition-all duration-300">
        <Link href="/dashboard" className="flex items-center gap-2 ">
          <Image
            src="/noteforge-logo.png"
            alt="Logo"
            width={32}
            height={32}
            className="shrink-0"
          />
          NoteForge
        </Link>
      </SidebarHeader>
      <React.Suspense>
        <SearchForm />
      </React.Suspense>

      <SidebarContent className="gap-0">
        <React.Suspense fallback={<Skeleton className="h-full" />}>
          <SidebarData data={data} />
        </React.Suspense>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

