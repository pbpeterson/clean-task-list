import { LocalRemoveTask } from "@/data/usecases/local-task/local-remove-task";
import { LocalStorageAdapter } from "@/infra/usecases/localstorage.save.task";

export const makeDeleteTask = () => {
  return new LocalRemoveTask(new LocalStorageAdapter());
};
