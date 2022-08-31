import { GetTaskStore } from "@/data/protocols/get-task-store";

export class LocalGetTask {
  constructor(private readonly getTaskStore: GetTaskStore) {}

  async getAll(): Promise<unknown> {
    const tasks = this.getTaskStore.fetchAll();
    return tasks;
  }

  async get(id: string): Promise<void> {
    this.getTaskStore.fetchItem(id);
  }
}
