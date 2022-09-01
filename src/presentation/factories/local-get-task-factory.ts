import { LocalGetTask } from "@/data/usecases/local-task/local-get-task";
import { LocalStorageDoActions } from "@/infra/usecases/localstorage.save.task";

export const makeGetTask = () => {
  return new LocalGetTask(new LocalStorageDoActions());
};
