import { TaskParams } from "../models/task-model";

export interface RemoveTask {
  removeAll: (key: string) => void;
  removeById: (key: string, id: string) => void;
}
