import { Link } from "react-router-dom";
import styles from "./style.module.scss";

export default ({ title, count, preview }) => {
  return (
    <div className={styles.written}>
      <div>
        <div className={styles.title}>{title}</div>
        <div className={styles.count}>{count}건</div>
      </div>
      <hr />
      <div className={styles.preview}>
        {preview.map((view, idx) => (
          <Link
            to={`/board/${view.board_id}/post/${view.post_id}`}
            key={`preview_${title}_${idx}`}
          >
            <div>{view.content}</div>
            <div>{view.create_date}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};
