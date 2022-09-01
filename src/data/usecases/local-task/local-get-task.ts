import { GetTaskStore } from "@/data/protocols/get-task-store";
import { TaskParams } from "@/domain/models/task-model";
import { GetTask } from "@/domain/usecases/get-task";

export class LocalGetTask implements GetTask {
  constructor(private readonly getTaskStore: GetTaskStore) {}

  async getAll(key: string): Promise<Array<TaskParams>> {
    try {
      const tasks = this.getTaskStore.fetchAll(key);
      return tasks;
    } catch (error) {
      return [];
    }
  }

  async getById(key: string, id: number): Promise<TaskParams> {
    try {
      const task = this.getTaskStore.fetchItem(key, id);
      if (Boolean(task)) {
        return task;
      } else {
        throw new Error();
      }
    } catch (error) {
      return null;
    }
  }
}
