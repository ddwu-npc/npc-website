import { Link, useLoaderData } from "react-router-dom";

import styles from "./style.module.scss";

export const BoardListDropdown = () => {
  const { boardList } = useLoaderData();

  return (
    <div className={styles.dropdown}>
      {boardList.map((board, idx) => (
        <div key={`BoardListDropdown_${board.board_id}`}>
          <Link to={`board/${board.board_id}`}>{board.bname}</Link>
          {idx + 1 < boardList.length && <hr />}
        </div>
      ))}
    </div>
  );
};
