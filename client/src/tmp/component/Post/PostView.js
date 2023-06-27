import React from "react";

import styles from "../../css/Post/PostView.module.css";

import { readUser } from "../../actions/user";
import { readPost, deletePost } from "../../actions/post";

import CommentView from "./CommentView";

const Option = (props) => {
  const setOptionList = () => {
    const option_list = document.querySelector("." + styles.option_list);
    option_list.style.display =
      option_list.style.display === "block" ? "none" : "block";
  };

  return (
    <div className={styles.option}>
      <iconify-icon icon="bi:three-dots-vertical" onClick={setOptionList} />
      <div className={styles.option_list}>
        <a onClick={props.edit}>
          <div>공유</div>
        </a>
        <a onClick={props.edit}>
          <div>수정</div>
        </a>
        <a onClick={props.option_delete}>
          <div>삭제</div>
        </a>
      </div>
    </div>
  );
};

const PostView = (props) => {
  const postData = readPost(props.post_id);

  const option_delete = () => {
    deletePost(props.post.id);
  };

  return (
    <React.Fragment>
      <div className={styles.postView}>
        <div className={styles.title}>{postData.title}</div>
        <Option share={null} edit={props.edit} option_delete={option_delete} />
        <div className={styles.writer}>
          <div className={styles.profile}></div>
          <div className={styles.info}>
            <div className={styles.name}>
              {readUser(postData.userno).nickname}
            </div>
            <div className={styles.date}>{postData.create_date}</div>
          </div>
        </div>
        <div className={styles.scope}>대상: {postData.range}</div>
        <div className={styles.view}>읽은 수: {postData.read_count}</div>
        <div className={styles.content}>{postData.content}</div>
        <div className={styles.postAttachment}>
          <div className={styles.postAttachmentTitle}>
            <iconify-icon icon="ant-design:file-zip-outlined" />
            첨부파일
          </div>
          <div className={styles.postAttachmentView}>
            <div>
              임시파일.pdf
              <iconify-icon icon="bx:download" />
            </div>
            <div>
              임시파일.pdf
              <iconify-icon icon="bx:download" />
            </div>
          </div>
        </div>
      </div>
      <CommentView postId={props.postId} />
    </React.Fragment>
  );
};

export default PostView;
