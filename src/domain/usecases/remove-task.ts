export interface RemoveTask {
  removeAll: (key: string) => void;
  removeById: (key: string, id: number) => void;
}
