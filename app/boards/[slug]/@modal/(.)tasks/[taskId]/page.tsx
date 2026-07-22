import { redirect } from 'next/navigation';

import { TaskViewDialog } from '@/features/tasks/components/task-view-dialog';
import {
  fetchTask,
  fetchColumnsWithTasks,
} from '@/features/tasks/server/actions';

interface TaskPageProps {
  params: Promise<{ slug: string; taskId: string }>;
}

export default async function TaskPage({ params }: TaskPageProps) {
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

  return <TaskViewDialog task={taskResult.data} columns={columns} />;
}
