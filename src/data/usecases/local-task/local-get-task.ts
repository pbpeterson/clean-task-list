import { GetTaskStore } from "@/data/protocols/get-task-store";

export class LocalGetTask {
  constructor(private readonly getTaskStore: GetTaskStore) {}

  async getAll(): Promise<void> {
    this.getTaskStore.fetchAll();
    return;
  }

  async get(id: string): Promise<void> {
    this.getTaskStore.fetchItem(id);
  }
}
