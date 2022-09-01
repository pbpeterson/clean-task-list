import { TaskParams } from "@/domain/models/task-model";

export interface RemoveTaskStore {
  clearAllTasks: (key: string) => void;
  clearById: (key: string, id: number) => void;
}
