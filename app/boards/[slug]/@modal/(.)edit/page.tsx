import { redirect } from 'next/navigation';

import { BoardDialog } from '@/features/boards/components/board-dialog';
import { fetchBoardBySlug } from '@/features/boards/server/actions';

interface EditBoardPageProps {
  params: Promise<{ slug: string }>;
}

export default async function EditBoardPage({ params }: EditBoardPageProps) {
  const { slug } = await params;
  const result = await fetchBoardBySlug(slug);

  if (result.error || !result.data) {
    redirect('/boards');
  }

  return <BoardDialog isEditing board={result.data} />;
}
