import { RemoveTaskStore } from "@/data/protocols/remove-task-store";
import { TaskParams } from "@/domain/models/task-model";

export class LocalRemoveTask {
  constructor(private readonly remoteTaskStore: RemoveTaskStore) {}
  async removeAll(key: string): Promise<Array<TaskParams>> {
    const tasks = this.remoteTaskStore.clearAllTasks(key);
    return tasks;
  }

  async removeById(key: string, id: number) {
    const tasksWithoutSelectedItem = this.remoteTaskStore.clearById(key, id);
    return tasksWithoutSelectedItem;
  }
}
