import { PlusIcon } from "lucide-react";
import Link from "next/link";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import { fetchColumns } from "@/features/tasks/server/actions";

export const Columns = async ({ slug }: { slug: string }) => {
  const res = await fetchColumns(slug);
  const columns = res.error ? [] : res.data || [];

  return (
    <div className="min-w-0 flex-1 overflow-auto p-6">
      <div className="flex min-w-max gap-x-4">
        {columns.map((col) => (
          <div key={col.id} className="flex w-73 flex-col">
            <h3 className="text-medium-grey text-sm">{`${col.title} (${col.tasks.length})`}</h3>
            <ScrollArea className="mt-6 h-[calc(100vh-200px)] w-full">
              <div className="w-70 space-y-5">
                {col.tasks.map((t) => (
                  <Card key={t.id} className="group cursor-pointer border-none">
                    <CardHeader className="px-4">
                      <CardTitle className="group-hover:text-purple text-[15px] leading-5">
                        {t.title}
                      </CardTitle>
                      <CardDescription className="text-medium-grey text-xs">
                        {`${t._count.subtasks} of ${t.subtasks.length} Subtasks`}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>
        ))}

        <div className="mt-11 flex w-70 items-center justify-center rounded-md bg-[#E9EFFA]">
          <Link
            href={`/boards/${slug}/edit`}
            className="hover:text-purple text-medium-grey flex cursor-pointer items-baseline text-2xl"
          >
            <PlusIcon className="mr-1 size-4 stroke-4" />
            New Column
          </Link>
        </div>
      </div>
    </div>
  );
};
