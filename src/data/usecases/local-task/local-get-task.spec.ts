import { GetTaskStoreSpy } from "@/data/tests/get-task-mock";
import { makeTasksList } from "@/data/tests/tasks";
import { LocalGetTask } from "@/data/usecases/local-task/local-get-task";

const makeSut = () => {
  const getTaskStoreSpy = new GetTaskStoreSpy();
  const localGetTask = new LocalGetTask(getTaskStoreSpy);

  return {
    sut: localGetTask,
    getTaskStoreSpy,
  };
};

describe("LocalGetTask", () => {
  it("should not call get if getAll is called", async () => {
    const { getTaskStoreSpy, sut } = makeSut();
    await sut.getAll("any_key");
    expect(getTaskStoreSpy.fetchAllCount).toBe(1);
    expect(getTaskStoreSpy.fetchItemCount).toBe(0);
  });

  it("should return an empty list if there are no tasks", async () => {
    const { getTaskStoreSpy, sut } = makeSut();
    getTaskStoreSpy.allTasks = [];
    const tasks = await sut.getAll("any_key");
    expect(tasks).toEqual([]);
  });

  it("should return an empty list if there is an error", async () => {
    const { getTaskStoreSpy, sut } = makeSut();
    getTaskStoreSpy.allTasks = makeTasksList();
    jest.spyOn(getTaskStoreSpy, "fetchAll").mockImplementationOnce(() => {
      getTaskStoreSpy.fetchAllCount++;
      throw new Error();
    });
    const tasks = await sut.getAll("any_key");
    expect(tasks).toEqual([]);
    expect(getTaskStoreSpy.fetchAllCount).toBe(1);
  });

  it("should return tasks if it exists", async () => {
    const { getTaskStoreSpy, sut } = makeSut();
    const mockedTasks = makeTasksList();
    getTaskStoreSpy.allTasks = mockedTasks;
    const tasks = await sut.getAll("any_key");
    expect(tasks).toEqual(mockedTasks);
    expect(getTaskStoreSpy.fetchAllCount).toBe(1);
  });

  it("should return a task by id", async () => {
    const { getTaskStoreSpy, sut } = makeSut();
    const mockedTasks = makeTasksList();
    getTaskStoreSpy.allTasks = mockedTasks;
    const currentTask = mockedTasks[0];
    const currentTaskId = currentTask.id;
    const task = await sut.getById("any_key", currentTaskId);
    expect(task).toEqual(currentTask);
    expect(getTaskStoreSpy.fetchItemCount).toBe(1);
  });

  it("should return null if task does not exist", async () => {
    const { getTaskStoreSpy, sut } = makeSut();
    const mockedTasks = makeTasksList();
    getTaskStoreSpy.allTasks = mockedTasks;
    const currentTask = mockedTasks[0];
    const currentTaskId = currentTask.id;
    const task = await sut.getById("any_key", currentTaskId + 1);
    expect(task).toEqual(null);
    expect(getTaskStoreSpy.fetchItemCount).toBe(1);
  });
});
