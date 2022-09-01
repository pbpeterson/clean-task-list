import { GetTaskStoreSpy } from "@/data/tests/get-task-mock";
import { makeTasksList } from "@/data/tests/tasks";
import { LocalGetTask } from "@/data/usecases/local-task/local-get-task";
import { LocalRemoveTask } from "@/data/usecases/local-task/local-remove-task";

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
