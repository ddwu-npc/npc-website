import { useLoaderData, Link } from "react-router-dom";
import { Icon } from "@iconify/react";

import Option from "./option";

import styles from "./style.module.scss";

export default () => {
  const { post, user } = useLoaderData();
  return (
    <div className={styles.contentBox}>
      <Option />
      <div className={styles.title}>{post.title}</div>
      <div className={styles.info}>
        <div className={styles.profile}>
          <img src={user.profile} />
          <div>{user.nickname}</div>
          <span>{post.create_date}</span>
        </div>
        <span>대상: {post.range}</span>
        <span>읽은 수: {post.read_count}</span>
      </div>
      <div className={styles.content}>{post.content}</div>
      <div className={styles.attachment}>
        <div>
          <Icon icon="ant-design:file-zip-outlined" /> 첨부파일
        </div>
        {post.attachment.map((e, idx) => (
          <span key={`post_attachment_${idx}`}>
            {e.name} <Icon icon="bx:download" />
          </span>
        ))}
      </div>
    </div>
  );
};
