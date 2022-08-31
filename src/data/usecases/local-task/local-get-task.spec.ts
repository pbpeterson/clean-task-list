import { GetTaskStoreSpy } from "@/data/tests/get-task-mock";
import { LocalGetTask } from "@/data/usecases/local-task/local-get-task";

const makeSut = () => {
  const getTaskStoreSpy = new GetTaskStoreSpy();
  const localGetTask = new LocalGetTask(getTaskStoreSpy);

  return {
    sut: localGetTask,
    getTaskStoreSpy,
  };
};

describe("LocalGetTask", () => {
  it("should not call getAll if get is called", async () => {
    const { getTaskStoreSpy, sut } = makeSut();
    await sut.get("any_id");
    expect(getTaskStoreSpy.fetchItemCount).toBe(1);
    expect(getTaskStoreSpy.fetchAllCount).toBe(0);
  });
});
