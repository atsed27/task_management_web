export type Task = {
  id: string;
  title: string;
  description?: string;
  attachment?: string;
  status?: string | null;
  subtasks?: subTask[];
};
export type file = {
  id: string;
  file_url: string;
};

export type subTask = {
  id: string;
  title: string;
  status?: string;
  description?: string;
};

export type mainTask = {
  id: string;
  title: string;
};

export type CardData = {
  id: string;
  title: string;
  tasks: Task[];
};
