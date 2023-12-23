import { useRef, useEffect, useState } from "react";

import { deleteComment, findAuthor } from "api/post";
import { getUserno } from "api/user";
import { Icon } from "@iconify/react";

import styles from "./style.module.scss";
import comment from "./comment";

export default ({ commentId }) => {
  const optionRef = useRef();
  const dropdownRef = useRef();
  
  const [shouldRenderOptions, setShouldRenderOptions] = useState();

  const del = async () => {
    try {
      await deleteComment(commentId);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  async function fetchData() {
    try {
      const commentUser = await fetchUserData(); // 비동기 함수 호출
      const currUser = await getUserno();

      return { commentUser, currUser };
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
  
  // 비동기 함수
  function fetchUserData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const userData = findAuthor(commentId, "comment");
        resolve(userData);
      }, 100);
    });
  }

  useEffect(() => {
    const option = optionRef.current;
    const dropdown = dropdownRef.current;

    option.onclick = () => {
      if (dropdown.style.visibility === "hidden")
        dropdown.style.visibility = "visible";
      else dropdown.style.visibility = "hidden";
    };
  });

  fetchData().then(({ commentUser, currUser }) => {
    setShouldRenderOptions(currUser && commentUser && currUser === commentUser);
  }).catch((error) => {
    console.error('Error:', error);
  });

  return shouldRenderOptions ?(
    <div className={styles.option}>
      <div className={styles.icon} ref={optionRef}>
        <Icon icon="bi:three-dots-vertical" />
      </div>
      <div className={styles.dropdown} ref={dropdownRef}>
        <div onClick={del}>삭제</div>
      </div>
    </div>
  ):(<div className={styles.option}>
      <div className={styles.icon} ref={optionRef}>
        <Icon icon="bi:three-dots-vertical" />
      </div>
    </div>
  );
};
