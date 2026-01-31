export type Column = {
  id?: string;
  title: string;
};

export type SubTask = {
  id: string;
  title: string;
  isCompleted: boolean;
};

export type TaskWithSubtasks = {
  id: string;
  title: string;
  description: string;
  columnId: string;
  subtasks: SubTask[];
};
