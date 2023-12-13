import { useRef, useEffect, useState } from "react";

import { deleteComment, findAuthor } from "api/post";
import { Icon } from "@iconify/react";

import styles from "./style.module.scss";
import comment from "./comment";

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

  const userno = 12;  //jwtToken으로 수정 필요
  const commentUser = async()=>{findAuthor(commentId, "comment")};
  console.log("commentUser", commentUser);
  const shouldRenderOptions = userno && commentUser && userno === commentUser;

  return shouldRenderOptions ?(
    <div className={styles.option}>
      <div className={styles.icon} ref={optionRef}>
        <Icon icon="bi:three-dots-vertical" />
      </div>
      <div className={styles.dropdown} ref={dropdownRef}>
        <div>수정</div>
        <div onClick={del}>삭제</div>
      </div>
    </div>
  ):null;
};
