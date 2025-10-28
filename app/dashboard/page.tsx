import CreateNotebookButton from "@/components/create-notebook-button";
import { PageWrapper } from "@/components/page-wrapper";
import { getNotebooks } from "@/server/notebooks";
import NotebookCard from "@/components/notebook-card";

async function page() {
  const notebooks = await getNotebooks();

  return (
    <PageWrapper breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }]}>
      <h1>Notebooks</h1>
      <CreateNotebookButton />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {notebooks.success &&
          notebooks?.notebooksByUser?.map((notebook) => (
            <NotebookCard key={notebook.id} notebook={notebook} />
          ))}
      </div>
      {notebooks.success && notebooks?.notebooksByUser?.length === 0 && (
        <div>No notebooks found</div>
      )}
    </PageWrapper>
  );
}

export default page;
