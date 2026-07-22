import { redirect } from 'next/navigation';

import { TaskFormDialog } from '@/features/tasks/components/task-form-dialog';
import { fetchColumnsWithTasks } from '@/features/tasks/server/actions';

interface NewTaskPageProps {
  params: Promise<{ slug: string }>;
}

export default async function NewTaskPage({ params }: NewTaskPageProps) {
  const { slug } = await params;
  const columnsResult = await fetchColumnsWithTasks(slug);

  if (columnsResult.error) {
    redirect(`/boards/${slug}`);
  }

  const columns = (columnsResult.data || []).map((col) => ({
    id: col.id,
    title: col.title,
  }));

  return <TaskFormDialog isEditing={false} columns={columns} />;
}
