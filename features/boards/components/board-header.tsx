"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { PlusIcon, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";

import { slugToName } from "../utils";
import { deleteBoardBySlug } from "../server/actions";
import { BoardActionMenu } from "@/features/boards/components/board-action-menu";

import { toast } from "sonner";

export const BoardHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const segment = pathname.split("/")[2];
  const selectedBoard = segment === "new" ? " " : slugToName(segment || "");

  const { isMobile, toggleSidebar } = useSidebar();

  const handleDelete = async () => {
    const slug = segment === "new" ? " " : segment;
    const res = await deleteBoardBySlug(slug);
    if (res.success) {
      toast.success("Board deleted successfully");
      router.push("/boards");
    }
  };

  return (
    <div className="dark:bg-dark-grey flex h-16 w-full items-center justify-between bg-white pl-3 md:h-20 md:px-6">
      <div className="flex items-center">
        <Image
          className="mr-3 md:hidden"
          src="/logo-mobile.svg"
          alt="kanban logo"
          width={24}
          height={25}
        />
        <button
          onClick={toggleSidebar}
          disabled={!isMobile}
          aria-label="open sidebar"
          aria-hidden={!isMobile}
          className="flex items-center gap-1"
        >
          <h1 className="text-lg md:text-xl">{selectedBoard}</h1>
          <ChevronDown className="text-purple size-4 font-bold md:hidden" />
        </button>
      </div>
      <div className="flex items-center md:gap-3">
        <Button
          className="h-8 w-12 rounded-full font-bold md:h-12 md:w-41"
          asChild
        >
          <Link href={`/boards/${segment}/tasks/new`}>
            <PlusIcon />
            <span className="hidden md:block">Add New Task</span>
          </Link>
        </Button>
        <BoardActionMenu
          selectedBoard={selectedBoard}
          onDelete={handleDelete}
          onEdit={() => router.push(`/boards/${segment}/edit`)}
        />
      </div>
    </div>
  );
};
