import { TaskParams } from "@/domain/models/task-model";

export interface GetTaskStore {
  fetchItem: (key: string, id: number) => TaskParams | null;

  fetchAll: (key: string) => Array<TaskParams> | [];

  clearAllTasks: (key: string) => Array<TaskParams>;
}
