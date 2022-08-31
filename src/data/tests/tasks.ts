import { TaskParams } from "@/domain/models/task-model";
import faker from "faker";

export const makeTasksList = (): Array<TaskParams> => {
  return [
    {
      id: faker.random.number(),
      content: faker.random.words(),
    },
    {
      id: faker.random.number(),
      content: faker.random.words(),
    },
    {
      id: faker.random.number(),
      content: faker.random.words(),
    },
  ];
};
