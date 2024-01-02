import { createRef, useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { Icon } from "@iconify/react";

import FileInput from "../fileInput";
import styles from "./style.module.scss";

export default () => {
  const { post } = useLoaderData();
  const [important, setImportant] = useState(post ? post.important : false);

  return (
    <div className={styles.title}>
      <input
        name="title"
        type="text"
        placeholder="제목 입력"
        defaultValue={post ? post.title : ""}
      />
      <div>
        <label htmlFor="important">중요 게시글 표시</label>
        <input
          id="important"
          name="important"
          type="checkbox"
          checked={important}
          onChange={(e) => {
            setImportant(e.value);
          }}
        />
      </div>
      <div className={styles.range}>
        <label htmlFor="range">대상</label>
        <select id="rangePost" name="rangePost">
          {["전체", "임원", "팀장"].map((value, idx) => (
            <option
              key={`range_option_${idx}`}
              value={value}
              selected={post ? post.rangePost === value : false}
            >
              {value}
            </option>
          ))}
        </select>
      </div>
      <FileInput files={[]} post/>
    </div>
  );
};
