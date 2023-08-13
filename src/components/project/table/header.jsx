import styles from "./style.module.scss";

export default () => {
  return (
    <div className={styles.header}>
      <div>번호</div>
      <div>제목</div>
      <div>팀명</div>
      <div>진행도</div>
      <div>작업 기간</div>
    </div>
  );
};
