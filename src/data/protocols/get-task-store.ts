import { TaskParams } from "@/domain/models/task-model";

export interface GetTaskStore {
  fetchItem: (id: string) => TaskParams | null;

  fetchAll: (id: string) => Array<TaskParams> | [];
}
