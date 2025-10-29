import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "./ui/sidebar";
import { Separator } from "@/components/ui/separator";
import Logout from "./logout";
import { ThemeToggle } from "./theme-toggle";
import Link from "next/link";
import React from "react";
import { Skeleton } from "./ui/skeleton";

interface PageWrapperProps {
  children: React.ReactNode;
  breadcrumbs: {
    label: string;
    href: string;
  }[];
}

export const PageWrapper = ({ children, breadcrumbs }: PageWrapperProps) => {
  return (
    <div className="flex flex-col gap-4">
      <header className="flex items-center p-4 justify-between w-full border-b">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((breadcrumb, index) => {
                const isLast = index === breadcrumbs.length - 1;
                return (
                  <React.Fragment key={index}>
                    <BreadcrumbItem>
                      {isLast ? (
                        <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink asChild>
                          <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {!isLast && <BreadcrumbSeparator />}
                  </React.Fragment>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Logout />
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-6 pt-0">{children}</div>
    </div>
  );
};

interface PageWrapperSkeletonProps {
  children: React.ReactNode;
}

export const PageWrapperSkeleton = ({ children }: PageWrapperSkeletonProps) => {
  return (
    <div className="flex flex-col gap-4">
      <header className="flex items-center p-4 justify-between w-full border-b">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              {Array.from({ length: 3 }).map((_, index) => {
                const isLast = index === 2;
                const isFirst = index === 0;
                return (
                  <React.Fragment key={index}>
                    <BreadcrumbItem>
                      {isFirst ? (
                        <BreadcrumbLink asChild>
                          <Link href={"/dashboard"}>Dashboard</Link>
                        </BreadcrumbLink>
                      ) : (
                        <BreadcrumbLink asChild>
                          <Skeleton className="h-4 w-20" />
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {!isLast && <BreadcrumbSeparator />}
                  </React.Fragment>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Logout />
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-6 pt-0">{children}</div>
    </div>
  );
};
