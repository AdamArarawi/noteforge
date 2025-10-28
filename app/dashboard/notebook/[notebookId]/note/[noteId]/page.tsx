import React from "react";
import { getNoteById } from "@/server/note";
import { notFound } from "next/navigation";
import { PageWrapper } from "@/components/page-wrapper";
import RichTextEditor from "@/components/rich-text-editor";
import { JSONContent } from "@tiptap/react";

type Params = Promise<{ noteId: string }>;

async function page({ params }: { params: Params }) {
  const { noteId } = await params;
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
      <h1>{note.title}</h1>
      <RichTextEditor noteId={note.id} content={content as JSONContent[]} />
    </PageWrapper>
  );
}

export default page;
