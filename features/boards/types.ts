export type Column = {
  id?: string;
  title: string;
};

export type Board = {
  id: string;
  name: string;
  slug: string;
};

export type BoardWithColumns = {
  id: string;
  name: string;
  userId: string;
  columns: Column[];
};
