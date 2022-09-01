import { GetTaskStore } from "@/data/protocols/get-task-store";
import { SaveTaskStore } from "@/data/protocols/save-task-store";
import { makeTasksList } from "@/data/tests/tasks";
import { LocalAddTask } from "@/data/usecases/local-task/local-add-task";
import { LocalGetTask } from "@/data/usecases/local-task/local-get-task";
import { TaskParams } from "@/domain/models/task-model";
import "jest-localstorage-mock";

class LocalStorageDoActions implements SaveTaskStore, GetTaskStore {
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
}

const makeSut = () => {
  const sut = new LocalStorageDoActions();
  const localSaveTask = new LocalAddTask(sut);
  const localGetTask = new LocalGetTask(sut);

  return {
    localSaveTask,
    localGetTask,
  };
};

beforeEach(() => {
  localStorage.clear();
});

describe("LocalStoreSaveTask", () => {
  it("should add task when a task is passed", async () => {
    const { localSaveTask, localGetTask } = makeSut();
    const myTask = { id: 1, content: "Sleep" };
    await localSaveTask.save(myTask);
    const getTasks = await localGetTask.getAll("pbTaskList");
    expect(getTasks).toContainEqual(myTask);
  });

  it("should get all tasks when exists more than 1", async () => {
    const { localSaveTask, localGetTask } = makeSut();
    const myTasks = makeTasksList();

    myTasks.forEach(async (task) => {
      await localSaveTask.save(task);
    });

    const savedTasks = await localGetTask.getAll("pbTaskList");
    expect(myTasks).toEqual(savedTasks);
  });
});
