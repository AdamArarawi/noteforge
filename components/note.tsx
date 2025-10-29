import React, { Suspense } from "react";
import { getNoteById } from "@/server/note";
import { notFound } from "next/navigation";
import { PageWrapper } from "@/components/page-wrapper";
import RichTextEditor from "@/components/rich-text-editor";
import { JSONContent } from "@tiptap/react";

interface Props {
  noteIdPromise: Promise<string>;
}

async function Note({ noteIdPromise }: Props) {
  const noteId = await noteIdPromise;
  const { note } = await getNoteById(noteId);
  if (!note) {
    notFound();
  }
  const content = note.content ? { type: "doc", content: note.content } : [];

  return (
    <PageWrapper
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        {
          label: note?.notebook?.name ?? "Notebook",
          href: `/dashboard/notebook/${note?.notebook?.id}`,
        },
        {
          label: note.title,
          href: `/dashboard/notebook/${note.notebookId}/note/${note.id}`,
        },
      ]}
    >
      <h1 className="text-2xl font-bold">{note.title}</h1>
      <Suspense fallback={<div>Loading note...</div>}>
        <RichTextEditor noteId={note.id} content={content as JSONContent[]} />
      </Suspense>
    </PageWrapper>
  );
}

export default Note;
