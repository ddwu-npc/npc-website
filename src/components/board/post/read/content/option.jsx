import { useRef, useEffect, useState } from "react";
import {
  useLoaderData,
  useLocation,
  Link,
  useNavigate,
} from "react-router-dom";
import { deletePost, findAuthor } from "api/post";
import { getUserno } from "api/user";
import { Icon } from "@iconify/react";

import styles from "./style.module.scss";

export default () => {
  const { boardId, postId } = useLoaderData();
  const navigate = useNavigate();
  const location = useLocation();

  const optionRef = useRef();
  const dropdownRef = useRef();

  const [shouldRenderOptions, setShouldRenderOptions] = useState();

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

  async function fetchData() {
    try {
      const postUser = await fetchUserData(); // 비동기 함수 호출
      const currUser = await getUserno();
      return { postUser, currUser };
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
  
  // 비동기 함수
  function fetchUserData() {
    return new Promise((resolve) => {
      // 여기서 비동기 작업을 수행하고 작업이 완료되면 resolve를 호출하여 값을 반환
      setTimeout(() => {
        const userData = findAuthor(postId, "post");
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

  fetchData().then(({ postUser, currUser }) => {
    setShouldRenderOptions(currUser && postUser && currUser === postUser);
  }).catch((error) => {
    console.error('Error:', error);
  });

  return shouldRenderOptions? (
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
  ):<div className={styles.option}>
  <div className={styles.icon} ref={optionRef}>
    <Icon icon="bi:three-dots-vertical" />
  </div>
  <div className={styles.dropdown} ref={dropdownRef}>
    <div onClick={share}>공유</div>
  </div>
</div>;
};
