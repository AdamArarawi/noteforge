import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { SidebarDataSkeleton } from "./sidebar-data-skeleton";
import { Label } from "./ui/label";
import { Search } from "lucide-react";

export async function AppSidebarSkeleton() {
  return (
    <Sidebar>
      <SidebarHeader className="overflow-hidden transition-all duration-300">
        <Link className="flex items-center gap-2 " href="/dashboard">
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
      <SidebarGroup className="py-0">
        <SidebarGroupContent className="relative">
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>
          <SidebarInput
            id="search"
            placeholder="Search your notes..."
            className="pl-8"
          />
          <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarContent className="gap-0">
        <SidebarDataSkeleton />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
