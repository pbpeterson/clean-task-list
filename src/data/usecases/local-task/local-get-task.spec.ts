import { TaskParams } from "@/domain/models/task-model";

interface GetTaskStore {
  fetchItem: (id: string) => TaskParams | null;

  fetchAll: (id: string) => Array<TaskParams> | [];
}

class GetTaskStoreSpy implements GetTaskStore {
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

class LocalGetTask {
  constructor(private readonly getTaskStore: GetTaskStore) {}

  async getAll(): Promise<void> {
    return;
  }

  async get(id: string): Promise<void> {
    this.getTaskStore.fetchItem(id);
  }
}

describe("LocalGetTask", () => {
  it("should not call getAll if get is called", async () => {
    const getTaskStoreSpy = new GetTaskStoreSpy();
    const localGetTask = new LocalGetTask(getTaskStoreSpy);
    await localGetTask.get("any_id");
    expect(getTaskStoreSpy.fetchItemCount).toBe(1);
    expect(getTaskStoreSpy.fetchAllCount).toBe(0);
  });
});
