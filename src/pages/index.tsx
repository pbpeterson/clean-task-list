import { makeDeleteTask } from "@/presentation/factories/local-delete-task.factory";
import { makeGetTask } from "@/presentation/factories/local-get-task-factory";
import { makeSaveTask } from "@/presentation/factories/local-save-task-factory";
import HomeTemplate from "@/presentation/Home/index";
import { GlobaStyles } from "@/presentation/styles/global";

const Home = () => {
  GlobaStyles();

  return (
    <div>
      <HomeTemplate
        localDeleteTask={makeDeleteTask()}
        localGetTask={makeGetTask()}
        localSaveTask={makeSaveTask()}
      />
    </div>
  );
};

export default Home;
