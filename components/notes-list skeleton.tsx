import { PageWrapperSkeleton } from "@/components/page-wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import NoteCardSkeleton from "./note-card-skeleton";

async function NotesListSkeleton() {
  return (
    <PageWrapperSkeleton>
      <h1 className="text-2xl font-bold">
        <Skeleton className="h-6 w-24" />
      </h1>
      <Skeleton className="h-8 w-24" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <NoteCardSkeleton key={index} />
        ))}
      </div>
    </PageWrapperSkeleton>
  );
}

export default NotesListSkeleton;
