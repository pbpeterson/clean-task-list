import { GetTaskStore } from "@/data/protocols/get-task-store";
import { TaskParams } from "@/domain/models/task-model";

export class LocalGetTask {
  constructor(private readonly getTaskStore: GetTaskStore) {}

  async getAll(key: string): Promise<Array<TaskParams>> {
    try {
      const tasks = this.getTaskStore.fetchAll(key);
      return tasks;
    } catch (error) {
      return [];
    }
  }

  async get(key: string, id: number): Promise<TaskParams> {
    const task = this.getTaskStore.fetchItem(key, id);
    return task;
  }
}
