import { Suspense } from "react";
import Note from "@/components/note";
import NoteSkeleton from "@/components/note-skeleton";

type Params = Promise<{ noteId: string }>;

async function page({ params }: { params: Params }) {
  return (
    <Suspense fallback={<NoteSkeleton />}>
      <Note noteIdPromise={params.then((p) => p.noteId)} />
    </Suspense>
  );
}

export default page;
