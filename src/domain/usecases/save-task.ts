import { TaskParams } from "../models/task-model";

export interface SaveTask {
  save: ({ content, id }: SaveTask.Params) => Promise<void>;
}

export namespace SaveTask {
  export type Params = TaskParams;
}
