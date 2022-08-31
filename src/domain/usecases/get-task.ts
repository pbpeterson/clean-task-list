interface GetTask {
  getAll: () => Promise<Array<GetTask.Params>>;
  getById: (id: number) => Promise<GetTask.Params>;
}

export namespace GetTask {
  export type Params = {
    id: number;
    content: string;
  };
}
