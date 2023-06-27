import React, { Component } from "react";

import styles from "../../css/Post/PostView.module.css";

import { readUser } from "../../actions/user";
import { readComment, createComment } from "../../actions/post";

const LoginSession = require("../../actions/LoginSession");

class Attachmant extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const fileInput = document.querySelector("#attachmant");
    fileInput.onchange = (e) => {
      const fileView = document.querySelector(`.${styles.fileView}`);
      const filename = String(e.target.files[0].name);

      const div = document.createElement("div");
      div.innerText = filename;

      fileView.append(div);
    };
  }
  render() {
    return (
      <div className={styles.attachmant}>
        파일 첨부
        <label for="attachmant">
          <iconify-icon icon="fluent:add-square-20-regular" />
        </label>
        <div className={styles.fileView}></div>
        <input id="attachmant" name="attachmant" type="file" multiple></input>
      </div>
    );
  }
}

const CommentInput = ({ postId }) => {
  const onSubmit = () => {
    const form = document.getElementById("Comment");
    const content = form.querySelector("input[name='content']").value;
    createComment(postId, { userno: LoginSession.userno, content });
  };

  return (
    <form id="Comment" className={styles.commentInput} onSubmit={() => false}>
      <div className={styles.writer}>
        {readUser(LoginSession.userno).nickname}
      </div>
      <input
        className={styles.content}
        name="content"
        type="textarea"
        placeholder="댓글 추가"
      ></input>
      <Attachmant />
      <input
        onClick={onSubmit}
        className={styles.submit}
        type="button"
        value="등록"
      ></input>
    </form>
  );
};

const CommentView = ({ postId }) => {
  const commentData = readComment(postId);
  const comments = [];
  for (let i = 0; i < commentData.length; i++) {
    comments.push(
      <div className={styles.comment}>
        <div className={styles.profile}></div>
        <div>
          <div className={styles.name}>{commentData[i].writer}</div>
          <div className={styles.date}>{new Date().toLocaleString()}</div>
          <div className={styles.content}>{commentData[i].content}</div>
          <div className={styles.CommentAttachment}>
            <b>첨부파일</b> 임시 파일.pdf
          </div>
        </div>
        <hr />
      </div>
    );
  }

  return (
    <div className={styles.commentView}>
      <div className={styles.commentTitle}>
        <iconify-icon icon="cil:speech" />
        댓글
      </div>
      <hr />
      <CommentInput postId={postId} />
      {comments}
    </div>
  );
};

export default CommentView;
