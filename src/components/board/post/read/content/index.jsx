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

export default () => {
  const { post, user} = useLoaderData();
  
  const [attachment, setAttachment] = useState([]);

  useEffect(() => {
    const fetchAttachment = async () => {
      try {
        const res = await readFile(post.postId);
        setAttachment(res);
      } catch (error) {
        console.error("첨부 파일을 가져오는 중 오류 발생:", error);
      }
    };
    fetchAttachment();
  }, [post.postId]);

  const handleDownloadClick = (file) => {
      downloadFile(file);
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
        <span>대상: {post.rangePost}</span>
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
        {attachment && attachment.map((e, idx) => (
          <span key={`post_attachment_${idx}`}>
            <div onClick={() => handleDownloadClick(e)}>{e.orgName}</div><Icon icon="bx:download" onClick={() => handleDownloadClick(e)}/>
          </span>
        ))}
      </div>
    </div>
  );
};