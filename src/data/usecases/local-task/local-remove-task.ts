import { RemoveTaskStore } from "@/data/protocols/remove-task-store";
import { TaskParams } from "@/domain/models/task-model";

export class LocalRemoveTask {
  constructor(private readonly remoteTaskStore: RemoveTaskStore) {}
  async removeAll(key: string) {
    this.remoteTaskStore.clearAllTasks(key);
  }

  async removeById(key: string, id: number) {
    this.remoteTaskStore.clearById(key, id);
  }
}
