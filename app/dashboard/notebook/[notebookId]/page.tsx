import React, { Suspense } from "react";
import NotesList from "@/components/notes-list";
import NotesListSkeleton from "@/components/notes-list skeleton";

type Params = Promise<{ notebookId: string }>;

async function page({ params }: { params: Params }) {
  return (
    <Suspense fallback={<NotesListSkeleton />}>
      <NotesList notebookIdPromise={params.then((p) => p.notebookId)} />
    </Suspense>
  );
}

export default page;
