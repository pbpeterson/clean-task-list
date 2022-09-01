import { makeTasksList } from "@/data/tests/tasks";
import { LocalAddTask } from "@/data/usecases/local-task/local-add-task";
import { LocalGetTask } from "@/data/usecases/local-task/local-get-task";
import { LocalRemoveTask } from "@/data/usecases/local-task/local-remove-task";
import "jest-localstorage-mock";
import { LocalStorageAdapter } from "./localstorage.save.task";

const makeSut = () => {
  const sut = new LocalStorageAdapter();
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

describe("LocalStorageAdapter", () => {
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
