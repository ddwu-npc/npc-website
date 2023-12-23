import { createRef, useState, useEffect } from "react";
import { Icon } from "@iconify/react";

import postStyles from "./post.module.scss";
import commentStyles from "./comment.module.scss";

export default (props) => {
  const [files, setFiles] = useState(props.files ?? []);
  const fileRef = createRef();
  const fileViewRef = createRef();

  const handleFileChange = (e) => {
    const newFiles = [...e.target.files, ...files];
    setFiles(newFiles);
  };

  const handleFileDelete = (idx) => {
    const newFiles = [...files.slice(0, idx), ...files.slice(idx + 1)];
    setFiles(newFiles);

    fileRef.current.value = null;
  };
  return (
    <div
      className={props.post ? postStyles.fileInput : commentStyles.fileInput}
    >
      <label htmlFor="attachment">
        파일 첨부하기
        <Icon icon="fluent:add-square-20-regular" />
      </label>
      <div ref={fileViewRef}>
        {files.map((file, idx) => (
          <div key={`file_${idx}`} onClick={() => handleFileDelete(idx)}>{file.name}</div>
        ))}
      </div>
      <input
        id="attachment"
        name="attachment"
        type="file"
        multiple
        onChange={handleFileChange}
        ref={fileRef}
      ></input>
    </div>
  );
};
