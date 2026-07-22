import { Columns } from "@/features/tasks/components/columns";
import { fetchColumnsWithTasks } from "@/features/tasks/server/actions";

type BoardPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BoardPage({ params }: BoardPageProps) {
  const slug = (await params).slug;

  const res = await fetchColumnsWithTasks(slug);
  const columns = res.error ? [] : res.data || [];

  return <Columns slug={slug} columns={columns} />;
}
