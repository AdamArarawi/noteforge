import React from "react";
import { getNotebooks } from "@/server/notebooks";
import { notFound } from "next/navigation";
import { PageWrapper } from "@/components/page-wrapper";
import NoteCard from "@/components/note-cards";
import CreateNoteButton from "@/components/create-note-button";

type Params = Promise<{ notebookId: string }>;

async function page({ params }: { params: Params }) {
  const { notebookId } = await params;
  const { notebooksByUser } = await getNotebooks();
  const notebook = notebooksByUser?.find(
    (notebook) => notebook.id === notebookId
  );
  if (!notebook) {
    notFound();
  }
  return (
    <PageWrapper
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        { label: notebook.name, href: `/dashboard/notebook/${notebook.id}` },
      ]}
    >
      <h1 className="text-2xl font-bold">{notebook.name}</h1>
      <CreateNoteButton notebookId={notebook.id} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {notebook.notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </PageWrapper>
  );
}

export default page;
