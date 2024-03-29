import { Link } from "react-router-dom";
import styles from "./style.module.scss";

export default ({ title, count, preview }) => {
  const limitedPreview = preview.slice(0, 5);
  
  const changeDateString = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toISOString();
    return formattedDate.substring(0, 10);
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
              <div>{changeDateString(view.createDate)}</div>
            </Link>
          ))
        ) : (
          <div>  </div>
        )}
      </div>
    </div>
  );
};