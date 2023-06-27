import { createRef, useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import styles from "./style.module.scss";
import { Icon } from "@iconify/react";

export default (props) => {
  const { post } = useLoaderData();

  const [preview, setPreview] = useState(false);
  const [content, setContent] = useState(post ? post.content : "");

  const contentRef = createRef();

  useState(() => {
    const textarea = document.querySelector("[name='content']");
    console.log(textarea);
  });

  const editElement = (
    <>
      <div className={styles.contentButton} onClick={() => setPreview(true)}>
        <Icon icon="mdi:print-preview" /> 미리보기
      </div>
      <textarea
        name="content"
        className={styles.content}
        ref={contentRef}
        onChange={(e) => setContent(e.target.value)}
      >
        {content}
      </textarea>
    </>
  );

  const previewElement = (
    <>
      <div className={styles.contentButton} onClick={() => setPreview(false)}>
        <Icon icon="material-symbols:edit-document-outline" /> 수정하기
      </div>
      <ReactMarkdown
        className={styles.content}
        children={content}
        remarkPlugins={[remarkGfm]}
      ></ReactMarkdown>
    </>
  );

  return preview ? previewElement : editElement;
};
