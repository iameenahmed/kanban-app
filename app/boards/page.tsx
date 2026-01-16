import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default function BoardsPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <p className="text-medium-grey mb-8 text-lg">
        Select a board or Create a new one to get started.
      </p>
      <Button asChild className="rounded-full">
        <Link href={"/boards/new"}>
          <PlusIcon />
          Create New Board
        </Link>
      </Button>
    </div>
  );
}
