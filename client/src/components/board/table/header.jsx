import styles from "./style.module.scss";

export default () => {
  return (
    <div className={styles.header}>
      <div>번호</div>
      <div>분류</div>
      <div>제목</div>
      <div>작성자</div>
      <div>첨부파일</div>
      <div>작성일</div>
    </div>
  );
};
