import { BoardDialog } from "@/features/boards/components/board-dialog";
import { fetchBoardBySlug } from "@/features/boards/server/actions";

interface EditBoardPageProps {
  params: Promise<{ slug: string }>;
}

export default async function EditBoardPage({ params }: EditBoardPageProps) {
  const { slug } = await params;
  const board = await fetchBoardBySlug(slug);

  return <BoardDialog isEditing={true} board={board} />;
}
