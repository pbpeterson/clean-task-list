import { GetTaskStore } from "@/data/protocols/get-task-store";
import { RemoveTaskStore } from "@/data/protocols/remove-task-store";
import { SaveTaskStore } from "@/data/protocols/save-task-store";
import { makeTasksList } from "@/data/tests/tasks";
import { LocalAddTask } from "@/data/usecases/local-task/local-add-task";
import { LocalGetTask } from "@/data/usecases/local-task/local-get-task";
import { LocalRemoveTask } from "@/data/usecases/local-task/local-remove-task";
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

const makeSut = () => {
  const sut = new LocalStorageDoActions();
  const localSaveTask = new LocalAddTask(sut);
  const localGetTask = new LocalGetTask(sut);
  const localDeleteTask = new LocalRemoveTask(sut);

  return {
    localSaveTask,
    localGetTask,
    localDeleteTask,
  };
};

beforeEach(() => {
  localStorage.clear();
});

describe("LocalStorageDoActions", () => {
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

  it("should return an empty array when there are no items", async () => {
    const { localGetTask } = makeSut();

    const savedTasks = await localGetTask.getAll("pbTaskList");
    expect(savedTasks).toEqual([]);
  });

  it("should remove all items from localStorage when clearAll is called", async () => {
    const { localSaveTask, localGetTask, localDeleteTask } = makeSut();
    const myTasks = makeTasksList();

    myTasks.forEach(async (task) => {
      await localSaveTask.save(task);
    });

    let savedTasks = await localGetTask.getAll("pbTaskList");
    expect(savedTasks).toEqual(myTasks);

    await localDeleteTask.removeAll("pbTaskList");

    savedTasks = await localGetTask.getAll("pbTaskList");

    expect(savedTasks).toEqual([]);
  });

  it("should remove an item from localStorage when clearById is called passing an id", async () => {
    const { localSaveTask, localGetTask, localDeleteTask } = makeSut();
    const myTasks = makeTasksList();

    myTasks.forEach(async (task) => {
      await localSaveTask.save(task);
    });

    const firstItem = myTasks[0];

    let savedTasks = await localGetTask.getAll("pbTaskList");
    expect(savedTasks).toEqual(myTasks);

    await localDeleteTask.removeById("pbTaskList", firstItem.id);

    savedTasks = await localGetTask.getAll("pbTaskList");

    expect(savedTasks).not.toContainEqual(firstItem);
  });
  it("should return all tasks when user try to remove an id that does not exist", async () => {
    const { localSaveTask, localGetTask, localDeleteTask } = makeSut();
    const myTasks = makeTasksList();

    myTasks.forEach(async (task) => {
      await localSaveTask.save(task);
    });

    const firstItem = myTasks[0];

    let savedTasks = await localGetTask.getAll("pbTaskList");
    expect(savedTasks).toEqual(myTasks);

    await localDeleteTask.removeById("pbTaskList", firstItem.id + 1);

    savedTasks = await localGetTask.getAll("pbTaskList");

    expect(savedTasks).toEqual(myTasks);
  });
});
