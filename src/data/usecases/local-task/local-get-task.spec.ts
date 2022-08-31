import { GetTaskStoreSpy } from "@/data/tests/get-task-mock";
import { LocalGetTask } from "@/data/usecases/local-task/local-get-task";

describe("LocalGetTask", () => {
  it("should not call getAll if get is called", async () => {
    const getTaskStoreSpy = new GetTaskStoreSpy();
    const localGetTask = new LocalGetTask(getTaskStoreSpy);
    await localGetTask.get("any_id");
    expect(getTaskStoreSpy.fetchItemCount).toBe(1);
    expect(getTaskStoreSpy.fetchAllCount).toBe(0);
  });
});
