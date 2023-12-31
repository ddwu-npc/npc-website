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
      const uniqueFiles = newFiles.filter((file, index, self) =>
        index === self.findIndex((f) => f.name === file.name)
      );
      if (uniqueFiles.length < newFiles.length) {
        alert('중복된 파일은 추가되지 않습니다.');
      }

      setFiles(uniqueFiles);
      updateInputFiles(uniqueFiles);
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
      if (file instanceof File)
        dataTransfer.items.add(file);
    });
    fileRef.current.files = dataTransfer.files;
  };

  useEffect(() => {
    if (props.files && props.files.length > 0)
      updateInputFiles(props.files);
  }, [props.files]);

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
          <div key={`file_${idx}`} onClick={() => handleFileDelete(file)}>{file.name || file.orgName}</div>
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