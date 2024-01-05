import { createRef, useState, useEffect } from "react";
import { Icon } from "@iconify/react";

import postStyles from "./post.module.scss";
import commentStyles from "./comment.module.scss";

export default (props) => {
  const [files, setFiles] = useState(props.files ?? []);
  const fileRef = createRef();
  const fileViewRef = createRef();

  const handleFileChange = (e) => {
    const newFiles = [...files, ...Array.from(e.target.files)];
    console.log("file list change", newFiles);

    if (newFiles.length > 3) {
      alert('최대 3개까지 업로드 가능합니다.');
    }else{
      setFiles(newFiles);
      updateInputFiles(newFiles);
    }
    
  };

  const handleFileDelete = (fileToDelete) => {
    //const newFiles = [...files.slice(0, idx), ...files.slice(idx + 1)];
    const newFiles = files.filter(file => file !== fileToDelete);
    console.log("file list delete", newFiles);
    setFiles(newFiles);

    const remainingFiles = newFiles.map(file => new File([file], file.name));
    const dataTransfer = new DataTransfer();
    remainingFiles.forEach(file => {
      dataTransfer.items.add(file);
    });

    fileRef.current.files = dataTransfer.files;
  };

  const updateInputFiles = (newFiles) => {
    const dataTransfer = new DataTransfer();
    newFiles.forEach(file => {
      dataTransfer.items.add(file);
    });
    fileRef.current.files = dataTransfer.files;
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
          <div key={`file_${idx}`} onClick={() => handleFileDelete(file)}>{file.name}</div>
        ))}
      </div>
      <input
        id="attachment"
        name="attachment"
        type="file"
        multiple="multiple"
        onChange={handleFileChange}
        ref={fileRef}
      ></input>
    </div>
  );
};