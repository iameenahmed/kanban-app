import { PlusIcon } from "lucide-react";
import Link from "next/link";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

type ColumnsProps = {
  columns: {
    id: string;
    title: string;
    tasks: {
      id: string;
      title: string;
      subtasks: { id: string }[];
      _count: { subtasks: number };
    }[];
  }[];
  slug: string;
};

export const Columns = async ({ columns, slug }: ColumnsProps) => {
  return (
    <div className="min-w-0 flex-1 overflow-auto p-6">
      <div className="flex min-w-max gap-x-4">
        {columns.map(({ id, title, tasks }) => (
          <div key={id} className="flex w-73 flex-col">
            <h3 className="text-medium-grey text-sm">{`${title} (${tasks.length})`}</h3>
            <ScrollArea className="mt-6 h-[calc(100vh-200px)] w-full">
              <div className="w-70 space-y-5">
                {tasks.map(({ id, title, _count, subtasks }) => (
                  <div key={id}>
                    <Link href={`/boards/${slug}?task=${id}`}>
                      <Card className="group cursor-pointer border-none">
                        <CardHeader className="px-4">
                          <CardTitle className="group-hover:text-purple text-[15px] leading-5">
                            {title}
                          </CardTitle>
                          <CardDescription className="text-medium-grey text-xs">
                            {`${_count.subtasks} of ${subtasks.length} Subtasks`}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    </Link>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        ))}

        <div className="mt-11 flex w-70 items-center justify-center rounded-md bg-[#E9EFFA] dark:bg-[#2B2C37]">
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
