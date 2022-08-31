import { TaskParams } from "@/domain/models/task-model";
import faker from "faker";

const makeTasksList = (): Array<TaskParams> => {
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
