import { TaskParams } from "@/domain/models/task-model";
import { GetTaskStore } from "@/data/protocols/get-task-store";
import { RemoveTaskStore } from "../protocols/remove-task-store";

export class GetTaskStoreSpy implements GetTaskStore, RemoveTaskStore {
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

  clearAllTasks(key: string): void {
    this.allTasks = [];
  }

  clearById(key: string, id: number): void {
    const filteredTasks = this.allTasks.filter((task) => task.id !== id);
    this.allTasks = filteredTasks;
  }
}
