export type Task = {
  title: string;
  description?: string;
  attachment?: string;
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
