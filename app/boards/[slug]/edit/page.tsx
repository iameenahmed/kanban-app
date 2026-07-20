import { BoardDialog } from "@/features/boards/components/board-dialog";
import { fetchBoardBySlug } from "@/features/boards/server/actions";
import { redirect } from "next/navigation";

interface EditBoardPageProps {
  params: Promise<{ slug: string }>;
}

export default async function EditBoardPage({ params }: EditBoardPageProps) {
  const { slug } = await params;
  const result = await fetchBoardBySlug(slug);

  if (result.error || !result.data) {
    if (result.error === "Unauthorized") {
      redirect("/signin");
    }
    redirect("/boards");
  }

  return <BoardDialog isEditing={true} board={result.data} />;
}
