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
      <select name="type">
        <option value="0">팀/개인</option>
        <option value="1">팀</option>
        <option value="2">개인</option>
      </select>
      <select name="process">
        <option value="0">진행 여부</option>
        <option value="1">개발 중</option>
        <option value="2">개발 완료</option>
      </select>
      <input name="text" type="text" placeholder="search"></input>
      <div className={styles.button} ref={submitRef}>
        <Icon icon="akar-icons:search" />
      </div>
    </form>
  );
};
