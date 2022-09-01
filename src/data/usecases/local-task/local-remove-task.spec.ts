import { RemoveTaskStore } from "@/data/protocols/remove-task-store";
import { GetTaskStoreSpy } from "@/data/tests/get-task-mock";
import { makeTasksList } from "@/data/tests/tasks";
import { TaskParams } from "@/domain/models/task-model";
import { LocalGetTask } from "./local-get-task";

class LocalRemoveTask {
  constructor(private readonly remoteTaskStore: RemoveTaskStore) {}
  async removeAll(key: string): Promise<Array<TaskParams>> {
    const tasks = this.remoteTaskStore.clearAllTasks(key);
    return tasks;
  }
}

const makeSut = () => {
  const getTaskStoreSpy = new GetTaskStoreSpy();
  const localRemoveTask = new LocalRemoveTask(getTaskStoreSpy);
  const localGetTask = new LocalGetTask(getTaskStoreSpy);

  return {
    sut: localRemoveTask,
    getTaskStoreSpy,
    localGetTask,
  };
};

describe("LocalRemoveTask", () => {
  it("should clear all tasks when clearAll is called", async () => {
    const { getTaskStoreSpy, sut, localGetTask } = makeSut();
    const tasksMock = makeTasksList();
    getTaskStoreSpy.allTasks = tasksMock;
    let tasks = await localGetTask.getAll("any_key");
    expect(tasks).toEqual(tasksMock);
    await sut.removeAll("any_key");
    tasks = await localGetTask.getAll("any_key");
    expect(tasks).toEqual([]);
  });
});
