import { GetTaskStore } from "@/data/protocols/get-task-store";
import { RemoveTaskStore } from "@/data/protocols/remove-task-store";
import { SaveTaskStore } from "@/data/protocols/save-task-store";
import { TaskParams } from "@/domain/models/task-model";

export class LocalStorageAdapter
  implements SaveTaskStore, GetTaskStore, RemoveTaskStore
{
  addTask({ content, id }: TaskParams) {
    const getOldValues = JSON.parse(localStorage.getItem("pbTaskList"));
    let values = [];
    if (getOldValues === null) {
      values.push({ content, id });
      localStorage.setItem("pbTaskList", JSON.stringify(values));
      return;
    }
    values.push(...getOldValues, { content, id });
    localStorage.setItem("pbTaskList", JSON.stringify(values));
  }

  fetchAll(key: string): Array<TaskParams> {
    const items = JSON.parse(localStorage.getItem(key));
    return items;
  }

  fetchItem(key: string, id: number): TaskParams {
    const items = this.fetchAll(key);
    const currentItem = items.find((task) => task.id === id);
    return currentItem;
  }

  clearAllTasks(key: string): void {
    localStorage.setItem(key, JSON.stringify([]));
  }

  clearById(key: string, id: number) {
    const getOldValues: Array<TaskParams> = JSON.parse(
      localStorage.getItem("pbTaskList")
    );
    let newValues = [];
    if (getOldValues === null) {
      return;
    }
    newValues = getOldValues.filter((task) => task.id !== id);
    localStorage.setItem(key, JSON.stringify(newValues));
  }
}
