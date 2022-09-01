import { GetTaskStoreSpy } from "@/data/tests/get-task-mock";
import { makeTasksList } from "@/data/tests/tasks";
import { LocalAddTask } from "@/data/usecases/local-task/local-add-task";
import { LocalGetTask } from "@/data/usecases/local-task/local-get-task";

const makeSut = () => {
  const getTaskStoreSpy = new GetTaskStoreSpy();
  const localGetTask = new LocalGetTask(getTaskStoreSpy);
  const localSaveTask = new LocalAddTask(getTaskStoreSpy);

  return {
    sut: localSaveTask,
    getTaskStoreSpy,
    localGetTask,
  };
};

describe("LocalAddTask", () => {
  it("should add task when add is called", async () => {
    const { getTaskStoreSpy, sut, localGetTask } = makeSut();
    const mockedTasks = makeTasksList();
    getTaskStoreSpy.allTasks = mockedTasks;
    const task = { id: 1, content: "This is my new task" };
    await sut.save(task);
    const tasks = await localGetTask.getAll("any_key");

    expect(tasks).toContainEqual(task);
  });
});
