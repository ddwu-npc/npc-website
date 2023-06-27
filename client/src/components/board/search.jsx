import { createRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import styles from "./style.module.scss";

export default () => {
  const formRef = createRef();
  const submitRef = createRef();

  useEffect(() => {
    submitRef.current.onclick = () => {
      formRef.current.submit();
    };
  });
  return (
    <form className={styles.search} ref={formRef}>
      <select name="range">
        <option value="0">전체</option>
        <option value="1">임원</option>
        <option value="2">팀장</option>
      </select>
      <select name="searchRange">
        <option value="0">제목</option>
        <option value="1">내용</option>
        <option value="2">제목 + 내용</option>
        <option value="3">작성자</option>
      </select>
      <input name="text" type="text" placeholder="search"></input>
      <div className={styles.button} ref={submitRef}>
        <Icon icon="akar-icons:search" />
      </div>
    </form>
  );
};
