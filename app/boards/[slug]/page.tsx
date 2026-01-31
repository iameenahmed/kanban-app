import { Columns } from "@/features/tasks/components/columns";
import { TaskDialog } from "@/features/tasks/components/task-dialog";
import { fetchColumnsWithTasks } from "@/features/tasks/server/actions";

type BoardPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BoardPage({ params }: BoardPageProps) {
  const slug = (await params).slug;
  const res = await fetchColumnsWithTasks(slug);
  const columns = res.error ? [] : res.data || [];

  const columnIdAndNames = columns.map((col) => ({
    id: col.id,
    title: col.title,
  }));

  const isOpen = false;
  const mode = "create";
  const task = null;

  return (
    <>
      <Columns slug={slug} columns={columns} />
      <TaskDialog
        isOpen={isOpen}
        mode={mode}
        task={task}
        columns={columnIdAndNames}
      />
    </>
  );
}
