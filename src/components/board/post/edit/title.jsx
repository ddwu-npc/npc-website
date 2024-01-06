import { createRef, useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { Icon } from "@iconify/react";
import { readFile} from "api/post";

import FileInput from "../fileInput";
import styles from "./style.module.scss";

export default () => {
  const { post } = useLoaderData();
  const [important, setImportant] = useState(post ? post.important : false);
  
  const [files, setFiles] = useState([]);

  if(post){
    useEffect(() => {
      const fetchAttachment = async () => {
        try {
          const response = await readFile(post.postId);
          if (response) {
            const fetchFileData = (file) => {
              return new Promise((resolve) => {
                const fileURL = `/files/download/${file.sName}`;
                const xhr = new XMLHttpRequest();
                xhr.open('GET', fileURL, true);
                xhr.responseType = 'blob';
        
                xhr.onload = function () {
                  const blob = new Blob([xhr.response], { type: 'application/octet-stream' });
                  const convertedFile = new File([blob], file.orgName, { type: 'application/octet-stream' });
                  resolve(convertedFile);
                };
        
                xhr.send();
              });
            };
            Promise.all(response.map(fetchFileData)).then((convertedFiles) => {
              setFiles(convertedFiles);
            });
          }
        } catch (error) {
          console.error("첨부 파일을 가져오는 중 오류 발생:", error);
        }
      };
      fetchAttachment();
    }, [post.postId]);
  }

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
      {post && post.havePostfile?files.length > 0 && <FileInput files={files} postId={post.postId} post />:<FileInput files={files} post />}
    </div>
  );
};
