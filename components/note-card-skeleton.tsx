import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function NoteCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-4 w-20" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Skeleton className="h-4 w-20" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="size-8" />
      </CardFooter>
    </Card>
  );
}
