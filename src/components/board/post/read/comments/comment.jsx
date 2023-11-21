import styles from "./style.module.scss";

import Option from "./option";

export default ({ comment }) => {
  return (
    <>
      <div className={styles.comment}>
        <Option commentId={comment.commentId}/>
        <img src={comment.user.profile} />
        <div>
          <div className={styles.info}>
            <span className={styles.writer}>{comment.user.nickname}</span>
            <span className={styles.date}>{comment.create_date}</span>
          </div>
          <div className={styles.content}>{comment.content}</div>
          <div className={styles.attachment}>
            <div></div>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};
