import Skeleton from "@/components/ui/skeleton";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function StatCardSkeleton(): React.JSX.Element {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>

        <Skeleton className="h-8 w-8 rounded-md" />
      </CardHeader>

      <CardContent>
        <Skeleton className="h-6 w-20" />
      </CardContent>
    </Card>
  );
}
