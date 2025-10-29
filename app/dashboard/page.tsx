import CreateNotebookButton from "@/components/create-notebook-button";
import { PageWrapper } from "@/components/page-wrapper";
import { Suspense } from "react";
import NotebooksList from "@/components/notebooks-list";
import NotebooksSkeleton from "@/components/notebooks-card-skeleton";

async function page() {
  return (
    <PageWrapper breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }]}>
      <h1>Notebooks</h1>
      <CreateNotebookButton />
      <Suspense
        fallback={
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <NotebooksSkeleton />
            <NotebooksSkeleton />
            <NotebooksSkeleton />
          </div>
        }
      >
        <NotebooksList />
      </Suspense>
    </PageWrapper>
  );
}

export default page;
