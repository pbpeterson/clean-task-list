import { TaskParams } from "@/domain/models/task-model";
import { GetTaskStore } from "@/data/protocols/get-task-store";

export class GetTaskStoreSpy implements GetTaskStore {
  allTasks: Array<TaskParams> = [];
  fetchAllCount = 0;
  fetchItemCount = 0;

  fetchItem(key: string, id: number): TaskParams {
    this.fetchItemCount++;
    const items = this.fetchAll(key);
    const currentItem = items.find((task) => task.id == id);
    return currentItem;
  }

  fetchAll(key: string) {
    this.fetchAllCount++;
    return this.allTasks;
  }
}
