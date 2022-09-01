import { TaskParams } from "@/domain/models/task-model";

export interface GetTask {
  getAll: (key: string) => Promise<Array<GetTask.Params>>;
  getById: (key: string, id: number) => Promise<GetTask.Params>;
}

export namespace GetTask {
  export type Params = TaskParams;
}
