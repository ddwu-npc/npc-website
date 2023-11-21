import { useRef, useEffect } from "react";

import { deleteComment } from "api/post";
import { Icon } from "@iconify/react";

import styles from "./style.module.scss";

export default ({ commentId }) => {
  const optionRef = useRef();
  const dropdownRef = useRef();

  const del = async () => {
    try {
      await deleteComment(commentId);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const option = optionRef.current;
    const dropdown = dropdownRef.current;

    option.onclick = () => {
      if (dropdown.style.visibility === "hidden")
        dropdown.style.visibility = "visible";
      else dropdown.style.visibility = "hidden";
    };
  });

  return (
    <div className={styles.option}>
      <div className={styles.icon} ref={optionRef}>
        <Icon icon="bi:three-dots-vertical" />
      </div>
      <div className={styles.dropdown} ref={dropdownRef}>
        <div>수정</div>
        <div onClick={del}>삭제</div>
      </div>
    </div>
  );
};
