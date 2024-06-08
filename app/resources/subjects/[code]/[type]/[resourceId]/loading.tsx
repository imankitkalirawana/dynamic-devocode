import { Card, Skeleton } from "@nextui-org/react";

export default function Loading() {
  return (
    <>
      <div className="px-8">
        <Card className="w-full max-w-[400px] mx-auto p-4">
          <div className="p-3 z-10 w-full justify-center flex items-center shrink-0">
            <Skeleton className="h-20 w-20 rounded-full" />
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <Skeleton className="h-6 w-2/5 rounded-full" />
            <Skeleton className="h-4 w-3/5 rounded-full" />
          </div>
          <div className="flex gap-2 items-center mb-4">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <Skeleton className="h-24 w-full rounded-lg" />
          </div>
          <div className="flex flex-col sm:flex-row justify-between gap-2 mb-4">
            <Skeleton className="h-10 w-28 rounded-lg" />
            <Skeleton className="h-10 w-28 rounded-lg" />
          </div>
        </Card>
      </div>
    </>
  );
}
