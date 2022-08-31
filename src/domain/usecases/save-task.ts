interface SaveTask {
  save: (id: number) => Promise<boolean>;
}
