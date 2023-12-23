import { createRef, useState, useEffect } from "react";
import { Icon } from "@iconify/react";

import postStyles from "./post.module.scss";
import commentStyles from "./comment.module.scss";

export default (props) => {
  const [files, setFiles] = useState(props.files ?? []);
  const fileRef = createRef();
  const fileViewRef = createRef();

  useEffect(() => {
    const fileInput = fileRef.current;
    fileInput.files = new DataTransfer().files;

    fileInput.onchange = (e) => {
      const newFiles = [e.target.files[0], ...files];
      setFiles(newFiles);
      fileInput.files = new DataTransfer().newFiles;
    };

    const fileView = fileViewRef.current;
    fileView.childNodes.forEach((file, idx) => {
      file.onclick = (e) => {
        if (window.confirm(`${file.innerText}를 삭제합니다`)) {
          const newFiles = [
            ...files.slice(0, idx),
            ...files.slice(idx + 1, files.length),
          ];
          setFiles(newFiles);
          fileInput.files = new DataTransfer().newFiles;
        }
      };
    });
  });

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
          <div key={`file_${idx}`}>{file.name}</div>
        ))}
      </div>
      <input
        id="attachment"
        name="attachment"
        type="file"
        multiple
        ref={fileRef}
      ></input>
    </div>
  );
};
