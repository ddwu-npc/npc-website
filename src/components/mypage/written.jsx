import { Link } from "react-router-dom";
import styles from "./style.module.scss";

export default ({ title, count, preview }) => {
  const limitedPreview = preview.slice(0, 5);
  
  const limitDateString = (dateString, maxLength) => {
    return dateString.substring(0, maxLength);
  };

  return (
    <div className={styles.written}>
      <div>
        <div className={styles.title}>{title}</div>
        <div className={styles.count}>{count}건</div>
      </div>
      <hr />
      <div className={styles.preview}>
        {limitedPreview && limitedPreview.length > 0 ? (
          limitedPreview.map((view, idx) => (
            <Link
              to={`/board/${view.boardId}/post/${view.postId}`}
              key={`preview_${title}_${idx}`}
            >
              <div className={styles.preContent}>{view.title}</div>
              <div className={styles.preContent}>{view.content}</div>
              <div>{limitDateString(view.createDate + "", 10)}</div>
            </Link>
          ))
        ) : (
          <div>  </div>
        )}
      </div>
    </div>
  );
};