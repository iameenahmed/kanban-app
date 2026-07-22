import { redirect } from 'next/navigation';

import { TaskFormDialog } from '@/features/tasks/components/task-form-dialog';
import {
  fetchTask,
  fetchColumnsWithTasks,
} from '@/features/tasks/server/actions';

interface EditTaskPageProps {
  params: Promise<{ slug: string; taskId: string }>;
}

export default async function EditTaskPage({ params }: EditTaskPageProps) {
  const { slug, taskId } = await params;

  const [taskResult, columnsResult] = await Promise.all([
    fetchTask(taskId),
    fetchColumnsWithTasks(slug),
  ]);

  if (taskResult.error || !taskResult.data) {
    redirect(`/boards/${slug}`);
  }

  const columns = (columnsResult.data || []).map((col) => ({
    id: col.id,
    title: col.title,
  }));

  return (
    <TaskFormDialog isEditing={true} task={taskResult.data} columns={columns} />
  );
}
