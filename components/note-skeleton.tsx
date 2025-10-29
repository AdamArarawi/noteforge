import { PageWrapperSkeleton } from "./page-wrapper";
import { Skeleton } from "./ui/skeleton";

async function NoteSkeleton() {
  return (
    <PageWrapperSkeleton>
      <h1>
        <Skeleton className="h-6 w-24" />
      </h1>
      <Skeleton className="min-h-96 w-full max-w-7xl" />
    </PageWrapperSkeleton>
  );
}

export default NoteSkeleton;
