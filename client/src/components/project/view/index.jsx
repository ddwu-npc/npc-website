import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

import { usePos } from "hooks";

import Header from "components/commons/header";
import Tag from "components/commons/tag";
import styles from "./style.module.scss";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

import { getProjectInfo, deleteProject, getQuickAttendance } from "api/project";
import { createAttendance } from "api/attendance";
import { Icon } from "@iconify/react";

export const loader = async ({ params }) => {
    const pid = params.pid;
    const data = await getProjectInfo(pid);
    return data;
};

export default () => {
    usePos("프로젝트");
    const navigate = useNavigate();

    const project = useLoaderData();
    const [option, setOption] = useState(false);

    return (
    <div className={styles.root}>
        <Header text="프로젝트" src="/project"/>
        <div className={styles.view}>
           <div className={styles.title}>
                <Tag text={project.process} color="#FED5A5"/>
                <h2>{project.pname}</h2>
                <div className={styles.option}>
                    <Icon 
                        icon="bi:three-dots-vertical" color="#7E7E7E" 
                        onClick={() => setOption(!option)}/>
                    {option && (
                        <div>
                            <div onClick={async () => {
                                const result = await createAttendance(project.pid);
                                if(result) {
                                    navigate(`/attendance/${result}`);
                                }
                                else {
                                    alert("출석 삭제에 실패했습니다.\n해당 현상이 반복될 시 관리자에게 문의바랍니다.")  
                                }
                            }}>출석 생성</div>
                            <div onClick={() => navigate("edit")}>수정</div>
                            <div onClick={async () => {
                                if (await deleteProject(project.pid)) navigate("/project");
                                else {
                                    alert("프로젝트 삭제에 실패했습니다.\n해당 현상이 반복될 시 관리자에게 문의바랍니다.")
                                }
                            }}>삭제</div>
                        </div>
                    )}
                </div>
            </div>
            <div>* DB & api 수정 시 project info display 수정 예정임</div>
            <ReactMarkdown
                className={styles.content}
                children={project.description}
                remarkPlugins={[remarkGfm]}
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
            <div className={styles.button}>
                <input type="button" value="빠른 출석 바로가기" onClick={async () => {
                   navigate(`/attendance/${await getQuickAttendance(project.pid)}`); 
                }}/> 
            </div>
        </div>
    </div>
    );
};