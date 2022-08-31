import { TaskParams } from "@/domain/models/task-model";
import { GetTaskStore } from "@/data/protocols/get-task-store";

export class GetTaskStoreSpy implements GetTaskStore {
  allTasks: Array<TaskParams> = [];
  fetchAllCount = 0;
  fetchItemCount = 0;

  fetchItem(id: string) {
    this.fetchItemCount++;
    return null;
  }

  fetchAll() {
    this.fetchAllCount++;
    return this.allTasks;
  }
}
