import { GetTask } from "@/domain/usecases/get-task";
import { RemoveTask } from "@/domain/usecases/remove-task";
import { SaveTask } from "@/domain/usecases/save-task";
import { useEffect, useState } from "react";
import * as S from "./styles";

type HomeTemplateParams = {
  localSaveTask: SaveTask;
  localDeleteTask: RemoveTask;
  localGetTask: GetTask;
};

const HomeTemplate = ({
  localDeleteTask,
  localGetTask,
  localSaveTask,
}: HomeTemplateParams) => {
  const [taskId, setTaskId] = useState(0);
  const [tasks, setTasks] = useState([]);

  const getItems = async () => {
    const myTasks = await localGetTask.getAll("pbTaskList");
    setTasks(myTasks);
  };

  useEffect(() => {
    getItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputValue = e.target.taskItem.value;
    await localSaveTask.save({ id: taskId, content: inputValue });
    setTaskId(taskId + 1);
    e.target.taskItem.value = "";
    getItems();
  };

  const handleRemove = async (taskId) => {
    localDeleteTask.removeById("pbTaskList", taskId);
    getItems();
  };

  const handleRemoveAll = async () => {
    localDeleteTask.removeAll("pbTaskList");
    getItems();
  };

  return (
    <S.Wrapper>
      <S.WrapperTodo>
        <S.Title>Clean Task List</S.Title>
        <form onSubmit={handleSubmit}>
          <S.Input
            type="text"
            name="taskItem"
            placeholder="Insert your new task"
          />
        </form>
        <S.TasksWrapper>
          {tasks.map((task) => (
            <S.TaskWrapper key={task.id}>
              <S.TaskContent title={task.content}>{task.content}</S.TaskContent>
              <S.RemoveTask onClick={() => handleRemove(task.id)}>
                ✖
              </S.RemoveTask>
            </S.TaskWrapper>
          ))}
        </S.TasksWrapper>
        {Boolean(tasks.length) && (
          <S.TaskDescriptionWrapper>
            <S.TaskDescription>
              You have {tasks.length} {tasks.length === 1 ? "task" : "tasks"}.
            </S.TaskDescription>
            <S.ClearAllButton onClick={() => handleRemoveAll()}>
              Clear All
            </S.ClearAllButton>
          </S.TaskDescriptionWrapper>
        )}
      </S.WrapperTodo>
    </S.Wrapper>
  );
};

export default HomeTemplate;
