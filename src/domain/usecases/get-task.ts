import { TaskParams } from "@/domain/models/task-model";

interface GetTask {
  getAll: () => Promise<Array<GetTask.Params>>;
  getById: (id: string) => Promise<GetTask.Params>;
}

export namespace GetTask {
  export type Params = TaskParams;
}
