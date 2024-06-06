import { Card, Skeleton } from "@nextui-org/react";

export default function Loading() {
  return (
    <>
      <div className="grid grid-cols-12 gap-4 gap-y-8 mt-8">
        {Array.from({ length: 12 }, (_, i) => (
          <Card
            className="space-y-5 col-span-12 md:col-span-6 lg:col-span-4 p-4"
            radius="lg"
          >
            <div className="flex flex-col gap-2 w-full" key={i}>
              <div className="flex justify-between items-center">
                <Skeleton className="h-8 w-28 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
              <Skeleton className="h-4 w-full rounded-full" />
              <div className="flex justify-between items-center gap-4">
                <Skeleton className="h-4 w-[40%] rounded-full" />
                <Skeleton className="h-4 w-[30%] rounded-full" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
