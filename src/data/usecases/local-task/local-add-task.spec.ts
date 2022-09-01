import { SaveTaskStore } from "@/data/protocols/save-task-store";
import { GetTaskStoreSpy } from "@/data/tests/get-task-mock";
import { makeTasksList } from "@/data/tests/tasks";
import { TaskParams } from "@/domain/models/task-model";
import { SaveTask } from "@/domain/usecases/save-task";
import { LocalGetTask } from "./local-get-task";

class LocalAddTask implements SaveTask {
  constructor(private readonly saveTaskStore: SaveTaskStore) {}

  async save({ content, id }: TaskParams): Promise<void> {
    this.saveTaskStore.addTask({ content, id });
  }
}

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
