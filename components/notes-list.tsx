import React from "react";
import { getNotebooks } from "@/server/notebooks";
import { notFound } from "next/navigation";
import { PageWrapper } from "@/components/page-wrapper";
import CreateNoteButton from "@/components/create-note-button";
import NoteCard from "@/components/note-cards";

interface Props {
  notebookIdPromise: Promise<string>;
}

async function NotesList({ notebookIdPromise }: Props) {
  const notebookId = await notebookIdPromise;
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

export default NotesList;
