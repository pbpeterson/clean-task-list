import { LocalAddTask } from "@/data/usecases/local-task/local-add-task";
import { LocalStorageDoActions } from "@/infra/usecases/localstorage.save.task";

export const makeSaveTask = () => {
  return new LocalAddTask(new LocalStorageDoActions());
};
