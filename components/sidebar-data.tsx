"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { ChevronRight, File } from "lucide-react";
import Link from "next/link";
import { useQueryState } from "nuqs";

interface SidebarDataProps {
  data: {
    navMain: {
      id: string;
      title: string;
      items: { title: string; url: string }[];
    }[];
  };
}

export function SidebarData({ data }: SidebarDataProps) {
  const [search] = useQueryState("search", { defaultValue: "" });

  const filteredData = data.navMain.filter((notebook) => {
    const notebookMatches = notebook.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const noteMatches = notebook.items.some((note) =>
      note.title.toLowerCase().includes(search.toLowerCase())
    );
    return notebookMatches || noteMatches;
  });

  return (
    <>
      {filteredData.map((notebook) => (
        <Collapsible
          key={notebook.id}
          title={notebook.title}
          defaultOpen
          className="group/collapsible"
        >
          <SidebarGroup>
            <SidebarGroupLabel
              asChild
              className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
            >
              <CollapsibleTrigger>
                {notebook.title}{" "}
                {notebook.items.length > 0 && (
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                )}
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {notebook.items.map((note) => (
                    <SidebarMenuItem key={note.title}>
                      <SidebarMenuButton asChild>
                        <Link href={note.url}>
                          <File />
                          {note.title}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      ))}
    </>
  );
}
