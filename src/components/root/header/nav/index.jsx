import styles from "./style.module.scss";

import Tap from "./tap";
import { BoardListDropdown } from "./dropdown";

export default (props) => {
  return (
    <div className={styles.nav}>
      <div className={styles.taps}>
        <Tap value={"게시판"} dropdown={<BoardListDropdown />} />
        <Tap link="/board/1" value={"중요 게시판(1)"} />
        <Tap link="/board/2" value={"중요 게시판(2)"} />
        <Tap link="/project" value={"프로젝트"} />
        <Tap link="/calendar" value={"일정"} />
      </div>
      <div className={styles.pos}>{props.pos}</div>
    </div>
  );
};
