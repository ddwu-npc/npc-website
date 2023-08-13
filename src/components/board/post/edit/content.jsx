import { createRef, useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import CodeMirror from "@uiw/react-codemirror";
import { githubLightInit } from "@uiw/codemirror-theme-github";
import { markdown } from "@codemirror/lang-markdown";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

import styles from "./style.module.scss";
import { Icon } from "@iconify/react";

export default (props) => {
  const { post } = useLoaderData();

  const [preview, setPreview] = useState(false);
  const [content, setContent] = useState(post ? post.content : "");

  const editElement = (
    <div className={styles.content}>
      <div className={styles.contentButton} onClick={() => setPreview(true)}>
        <Icon icon="mdi:print-preview" /> 미리보기
      </div>
      <CodeMirror
          height= "550px"
          value={content}
          theme={githubLightInit({
              settings: {
                  fontFamily: `"Fira Code", "Fira Mono", Menlo, Consolas, "DejaVu Sans Mono", monospace`,
                  background: "rgb(250, 250, 250)",
              },
          })}
          basicSetup={{ highlightActiveLine: false, lineNumbers: false }}
          extensions={[markdown()]}
          onChange={(value, viewUpdate) => setContent(value)}
      />
    </div>
  );

  const previewElement = (
    <div className={styles.content}>
      <div className={styles.contentButton} onClick={() => setPreview(false)}>
        <Icon icon="material-symbols:edit-document-outline" /> 수정하기
      </div>
      <ReactMarkdown
        children={content}
        remarkPlugins={[remarkGfm]}
        className="markdown-body"
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
    </div>
  );

  return preview ? previewElement : editElement;
};
