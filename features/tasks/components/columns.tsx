import { BoardDndColumns } from "./board-dnd-columns";
import { type BoardColumn } from "../types";

type ColumnsProps = {
  columns: BoardColumn[];
  slug: string;
};

export const Columns = async ({ columns, slug }: ColumnsProps) => {
  const boardStateKey = columns
    .map(
      (column) =>
        `${column.id}:${column.tasks.map((task) => task.id).join(",")}`,
    )
    .join("|");

  return <BoardDndColumns key={boardStateKey} slug={slug} columns={columns} />;
};
