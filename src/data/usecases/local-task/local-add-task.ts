import { TaskParams } from "@/domain/models/task-model";
import { SaveTaskStore } from "@/data/protocols/save-task-store";
import { SaveTask } from "@/domain/usecases/save-task";

export class LocalAddTask implements SaveTask {
  constructor(private readonly saveTaskStore: SaveTaskStore) {}

  async save({ content, id }: TaskParams): Promise<void> {
    this.saveTaskStore.addTask({ content, id });
  }
}
