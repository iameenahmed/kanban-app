import { PlusIcon, GripVerticalIcon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardHeader } from '@/components/ui/card';

export const ColumnsSkeleton = () => {
  return (
    <div className="min-w-0 flex-1 overflow-auto p-6">
      <div className="flex min-w-max gap-x-4">
        {[
          { titleWidth: 'w-28', taskCounts: 3 },
          { titleWidth: 'w-24', taskCounts: 2 },
          { titleWidth: 'w-20', taskCounts: 2 },
        ].map((col, colIdx) => (
          <section key={colIdx} className="flex w-73 flex-col">
            <div className="flex items-center gap-2">
              <div className="text-medium-grey/40 -ml-1 flex size-6 items-center justify-center">
                <GripVerticalIcon className="size-4" />
              </div>
              <Skeleton className={`h-4 ${col.titleWidth}`} />
            </div>

            <ScrollArea className="mt-6 h-[calc(100vh-200px)] w-full">
              <div className="w-70 space-y-5 rounded-md pb-20">
                {Array.from({ length: col.taskCounts }).map((_, taskIdx) => (
                  <Card key={taskIdx} className="border-none shadow-sm">
                    <CardHeader className="px-4">
                      <Skeleton className="h-5 w-5/6 rounded-sm" />
                      <Skeleton className="mt-1.5 h-4 w-1/2 rounded-sm" />
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </section>
        ))}

        <div className="mt-11 flex w-70 items-center justify-center rounded-md bg-[#E9EFFA] dark:bg-[#2B2C37]">
          <div className="text-medium-grey flex items-baseline text-2xl font-bold">
            <PlusIcon className="mr-1 size-4 stroke-4" />
            New Column
          </div>
        </div>
      </div>
    </div>
  );
};
