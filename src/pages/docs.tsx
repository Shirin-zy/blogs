import Player from "./components/videoPlayer/player";
import style from "./dosc.less";
const DocsPage = () => {
  return (
    <div>
      <Player />
      <div className={style.bg}></div>
      <div className={style.bg}></div>
    </div>
  );
};

export default DocsPage;
