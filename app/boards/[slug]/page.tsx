import { Columns } from "@/features/tasks/components/columns";
import { TaskViewDialog } from "@/features/tasks/components/task-view-dialog";
import { TaskFormDialog } from "@/features/tasks/components/task-form-dialog";
import {
  fetchColumnsWithTasks,
  fetchTask,
} from "@/features/tasks/server/actions";
import { TaskWithSubtasks } from "@/features/tasks/types";

type BoardPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ task: string; edit: string }>;
};

export default async function BoardPage({
  params,
  searchParams,
}: BoardPageProps) {
  const slug = (await params).slug;
  const taskParam = (await searchParams).task;
  const isEdit = (await searchParams).edit === "1";

  const res = await fetchColumnsWithTasks(slug);
  const columns = res.error ? [] : res.data || [];

  const columnsIdsAndNames = columns.map((col) => ({
    id: col.id,
    title: col.title,
  }));

  let task: TaskWithSubtasks | null = null;

  if (taskParam && taskParam !== "new") {
    const result = await fetchTask(taskParam);
    task = result.error ? null : result.data || null;
  }

  return (
    <>
      <Columns slug={slug} columns={columns} />
      {isEdit || taskParam === "new" ? (
        <TaskFormDialog
          isEditing={isEdit}
          task={task}
          columns={columnsIdsAndNames}
        />
      ) : (
        task && <TaskViewDialog task={task} columns={columnsIdsAndNames} />
      )}
    </>
  );
}
