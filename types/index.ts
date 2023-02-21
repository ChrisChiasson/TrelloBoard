export type ID = string;

export interface Column {
  id: ID;
  tasks: Task[];
  title: string;
}

export interface Task {
  createdAt: Date;
  id: ID;
  title: string;
}