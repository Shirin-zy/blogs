import Player from "@/pages/components/videoPlayer/player";
import style from "./index.less";
const Home = () => {
  return (
    <div>
      <Player />
      <div className={style.bg}></div>
      <div className={style.bg}></div>
    </div>
  );
};

export default Home;
