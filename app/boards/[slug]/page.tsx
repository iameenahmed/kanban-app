import { Columns } from "@/features/tasks/components/columns";

type BoardPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BoardPage({ params }: BoardPageProps) {
  const slug = (await params).slug;

  return <Columns slug={slug} />;
}
