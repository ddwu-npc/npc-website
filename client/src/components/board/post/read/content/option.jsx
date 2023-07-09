import { useRef, useEffect } from "react";
import {
  useLoaderData,
  useLocation,
  Link,
  useNavigate,
} from "react-router-dom";
import { deletePost } from "api/post";
import { Icon } from "@iconify/react";

import styles from "./style.module.scss";

export default () => {
  const { boardId, postId } = useLoaderData();
  const navigate = useNavigate();
  const location = useLocation();

  const optionRef = useRef();
  const dropdownRef = useRef();

  const share = async () => {
    try {
      await navigator.clipboard.writeText(location.pathname);
      alert("현재 게시글의 링크롤 복사했습니다.");
    } catch (err) {
      console.log(err);
    }
  };

  const del = async () => {
    try {
      await deletePost(postId);
      alert("현재 게시글을 삭제했습니다.");
      navigate(`/board/${boardId}`);
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
        <div onClick={share}>공유</div>
        <div>
          <Link to="edit">수정</Link>
        </div>
        <div onClick={del}>삭제</div>
      </div>
    </div>
  );
};
