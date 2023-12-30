import { useLoaderData, Link } from "react-router-dom";
import { useState, useEffect} from 'react';
import { Icon } from "@iconify/react";

import axios from "api/axios";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { readFile, downloadFile } from "api/post";
import { getToken } from "api/jwtToken";
import { saveAs } from 'file-saver';

import Option from "./option";
import styles from "./style.module.scss";

const determineContentType = (extension) => {
  switch (extension.toLowerCase()) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    // 다른 파일 형식에 대한 처리 추가
    default:
      return null; // 알 수 없는 확장자인 경우, null 또는 다른 기본값 설정
  }
};

export default () => {
  const { post, user} = useLoaderData();
  var rangeP = post.rangePost;
  if(post.rangePost=="public"){
    rangeP = "전체";
  }
    const [attachment, setAttachment] = useState([]);
    useEffect(() => {
      const fetchAttachment = async () => {
        try {
          const result = await readFile(post.postId);
          setAttachment(result);
        } catch (error) {
          console.error("첨부 파일을 가져오는 중 오류 발생:", error);
        }
      };
  
      fetchAttachment();
    }, [post.postId]);
    /*
    const handleDownloadClick = () => {
      downloadFile(attachment.sName);
    };
    */
    const handleDownloadClick = () => {
      console.log("fileName", attachment.sName);
      const jwtToken = getToken();
      axios.get(`/files/download/${attachment.sName}`, {
          withCredentials: true,
          headers: {
              'Authorization': `Bearer ${jwtToken}`
          },
          responseType: 'blob'
      })
      .then(res => {
          //saveAs(res, attachment.sName);
          //console.log("Content-Type", res.headers['content-type']);
          //const blob = new Blob([res.data]);
          //saveAs(blob, attachment.sName);
          
          
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const a = document.createElement('a');
          a.href = url;

          //const extension = attachment.sName.split('.').pop().toLowerCase();
          //const blobContentType = determineContentType(extension);
          a.download = attachment.sName;
          //a.type = blobContentType;
          //console.log("blobContentType", blobContentType);
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
          
      })
      .catch(error => {
          console.error('파일 다운로드 중 오류 발생 :', error);
      });
  };
    
  return (
    <div className={styles.contentBox}>
      <Option />
      <div className={styles.title}>{post.title}</div>
      <div className={styles.info}>
        <div className={styles.profile}>
          <img src={user ? user.profile : "로딩 중"} />
          <div>{user ? user.nickname : "로딩 중"}</div>
          <span>{post.create_date}</span>
        </div>
        <span>대상: {rangeP}</span>
        <span>읽은 수: {post.readCount}</span>
      </div>
      <ReactMarkdown
        children={post.content}
        remarkPlugins={[remarkGfm]}
        className={styles.content}
        components={{
        code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
            <SyntaxHighlighter
                {...props}
                children={String(children).replace(/\n$/, "")}
                style={oneLight}
                language={match[1]}
                PreTag="div"
            />
            ) : (
            <code {...props} className={className}>
                {children}
            </code>
            );
        },
        }}
      />
      <div className={styles.attachment}>
        <div>
          <Icon icon="ant-design:file-zip-outlined" /> 첨부파일
        </div>
        {attachment && (
          <span key={`post_attachment_0`} onClick={handleDownloadClick}>
            {attachment.orgName} <Icon icon="bx:download" />
            <img src={`/files/download/${attachment.sName}`} alt={attachment.orgName} />
          </span>
        )}
      </div>
    </div>
  );
};
/*

        {post.attachment.map((e, idx) => (
          <span key={`post_attachment_${idx}`}>
            {e.name} <Icon icon="bx:download" />
          </span>
        ))}
        */

//<img src={`/files/download/${attachment.sName}`} alt={attachment.orgName} />