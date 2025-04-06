export interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
  }
  
  // Array en memoria para almacenar tareas
  export const tasks: Task[] = [];
  