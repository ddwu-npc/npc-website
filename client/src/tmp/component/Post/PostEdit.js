import React, { Component } from "react";

import styles from "../../css/Post/PostEdit.module.css";

import { readPost, createPost, updatePost } from "../../actions/post";

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

const PostEdit = ({ type, id }) => {
  const postData =
    type === "update"
      ? readPost(id)
      : {
          title: null,
          range: null,
          important: false,
          content: null,
        };

  const onSubmit = () => {
    const form = document.getElementById("PostEdit");
    const title = form.querySelector("input[name='title']").value;
    const important = form.querySelector("input[name='important']").value;
    const range = form.querySelector("input[name='range']").value;
    const attachment = form.querySelector("input[name='attachment']").value;
    const content = form.querySelector("input[name='content']").value;

    if (type === "update") {
      updatePost(id, { title, important, range, attachment, content });
    }
    if (type === "create") {
      createPost({
        userno: LoginSession.userno,
        board_id: id,
        title,
        important,
        range,
        attachment,
        content,
      });
    }
  };

  return (
    <div className={styles.postEdit}>
      <form id="PostEidt">
        <div className={styles.title}>
          <input
            name="title"
            type="text"
            placeholder="제목 입력"
            defaultValue={postData.title}
          ></input>
          <div className={styles.info}>
            <div className={styles.important}>
              <label for="important">중요 게시글 표시</label>
              <input
                name="important"
                type="checkbox"
                defaultChecked={postData.important}
              ></input>
            </div>
            {postData.important}
            <div className={styles.scope}>
              <label for="range">대상</label>
              <select
                name="range"
                className={styles.view_scope}
                defaultValue={postData.range}
              >
                {["전체", "임원", "팀장"].map((range) => (
                  <option value={range}>{range}</option>
                ))}
              </select>
            </div>
            <Attachmant />
          </div>
        </div>
        <textarea name="content" type="textarea" placeholder="내용입력">
          {postData.content}
        </textarea>
        <div className={styles.submit}>
          <input
            onClick={onSubmit}
            className={styles.submitButton}
            type="button"
            value="업로드"
          ></input>
        </div>
        <input
          className={styles.cancel}
          type="button"
          value="입력 취소"
        ></input>
      </form>
    </div>
  );
};

export default PostEdit;
