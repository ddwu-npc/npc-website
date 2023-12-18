import { useRef } from "react";
import { useLoaderData } from "react-router-dom";

import { createComment } from "api/post";

import FileInput from "../../fileInput";
import styles from "./style.module.scss";

export default () => {
  const { postId, user } = useLoaderData(); // 로그인 세션에서 가져오도록 수정 필요
  const formRef = useRef();
  const nickname = sessionStorage.getItem('nickname');

  const handleResizeHeight = (e) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const submit = async () => {
    const form = formRef.current;
    const textarea = form.querySelector("textarea");
    console.log(textarea);
    const data = {
      userno: user.userno,
      content: textarea.value,
    };
    await createComment(postId, data);
    //window.location.reload();
  };

  return (
    <div className={styles.input} ref={formRef}>
      <div className={styles.writer}>{nickname}</div>
      <textarea
        name="content"
        placeholder="댓글 추가"
        rows={0}
        onChange={handleResizeHeight}
      ></textarea>
      <FileInput files={[]} comment />
      <input type="button" value="등록" onClick={submit} />
    </div>
  );
};
