import { TaskParams } from "@/domain/models/task-model";

export interface SaveTaskStore {
  addTask: ({ content, id }: TaskParams) => void;
}
