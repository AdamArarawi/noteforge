import { getNotebooks } from "@/server/notebooks";
import NotebookCard from "@/components/notebook-card";

async function NotebooksList() {
  const notebooks = await getNotebooks();

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {notebooks.success &&
          notebooks?.notebooksByUser?.map((notebook) => (
            <NotebookCard key={notebook.id} notebook={notebook} />
          ))}
      </div>
      {notebooks.success && notebooks?.notebooksByUser?.length === 0 && (
        <div>No notebooks found</div>
      )}
    </>
  );
}

export default NotebooksList;
