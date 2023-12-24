import { useLoaderData, Link } from "react-router-dom";
import {useState, useEffect} from 'react';
import { Icon } from "@iconify/react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { readFile } from "api/post";

import Option from "./option";
import styles from "./style.module.scss";

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
  
  console.log("post", post.postId);
  console.log("attachment", attachment);

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
        <span key={`post_attachment_0`}>
        {attachment.orgName} <Icon icon="bx:download" />
        </span>
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