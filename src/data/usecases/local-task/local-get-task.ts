import { GetTaskStore } from "@/data/protocols/get-task-store";
import { TaskParams } from "@/domain/models/task-model";

export class LocalGetTask {
  constructor(private readonly getTaskStore: GetTaskStore) {}

  async getAll(): Promise<Array<TaskParams>> {
    try {
      const tasks = this.getTaskStore.fetchAll();
      return tasks;
    } catch (error) {
      return [];
    }
  }

  async get(id: string): Promise<void> {
    this.getTaskStore.fetchItem(id);
  }
}
