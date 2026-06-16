export type Column = {
  id?: string;
  title: string;
};

export type SubTask = {
  id?: string;
  title: string;
  isCompleted?: boolean;
};

export type TaskWithSubtasks = {
  id?: string;
  title: string;
  description?: string | null | undefined;
  columnId: string;
  subtasks: SubTask[];
};

export type Task = {
  id: string;
  title: string;
  subtasks: { id: string }[];
  _count: { subtasks: number };
};

export type BoardColumn = {
  id: string;
  title: string;
  tasks: Task[];
};
