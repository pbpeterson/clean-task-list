import { TaskParams } from "../models/task-model";

export interface RemoveTask {
  removeAll: (key: string) => Promise<Array<TaskParams>>;
  removeById: (key: string, id: string) => Promise<Array<TaskParams>>;
}
