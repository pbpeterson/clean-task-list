export interface RemoveTaskStore {
  clearAllTasks: (key: string) => void;
  clearById: (key: string, id: number) => void;
}
