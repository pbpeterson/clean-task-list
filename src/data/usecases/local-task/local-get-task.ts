import { GetTaskStore } from "@/data/protocols/get-task-store";

export class LocalGetTask {
  constructor(private readonly getTaskStore: GetTaskStore) {}

  async getAll(): Promise<unknown> {
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
