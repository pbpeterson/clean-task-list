import { TaskParams } from "@/domain/models/task-model";

export interface RemoveTaskStore {
  clearAllTasks: (key: string) => Array<TaskParams>;
  clearById: (key: string, id: number) => void;
}
