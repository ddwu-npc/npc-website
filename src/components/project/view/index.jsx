import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

import { usePos } from "hooks";

import Header from "components/commons/header";
import Tag from "components/commons/tag";
import styles from "./style.module.scss";

import { getProjectInfo, deleteProject, getQuickAttendance } from "api/project";
import { readUser } from "api/user";
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

    const projectData = useLoaderData();
    const [option, setOption] = useState(false);

    return (
    <div className={styles.root}>
        <Header text="프로젝트" src="/project"/>
        <div className={styles.view}>
           <div className={styles.title}>
                <Tag text={projectData.project.process} color="#FED5A5"/>
                <h2>{projectData.project.pname}</h2>
                <div className={styles.option}>
                    <Icon 
                        icon="bi:three-dots-vertical" color="#7E7E7E" 
                        onClick={() => setOption(!option)}/>
                    {option && (
                        <div>
                            <div onClick={async () => {
                                const result = await createAttendance(projectData.project.pid);
                                if(result) {
                                    navigate(`/attendance/${result}`);
                                }
                                else {
                                    alert("출석 삭제에 실패했습니다.\n해당 현상이 반복될 시 관리자에게 문의바랍니다.")  
                                }
                            }}>출석 생성</div>
                            <div onClick={() => navigate("edit")}>수정</div>
                            <div onClick={async () => {
                                if (await deleteProject(projectData.project.pid)) navigate("/project");
                                else {
                                    alert("프로젝트 삭제에 실패했습니다.\n해당 현상이 반복될 시 관리자에게 문의바랍니다.")
                                }
                            }}>삭제</div>
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.describtion}>
                    <div>
                        <label>장르</label>
                        <span>{projectData.project.type}</span>
                    </div>
                    <div>
                        <label>팀장</label>
                        <span>{projectData.project.leader}</span>
                    </div>
                    <div>
                        <label>개발 기간</label>
                        <span>{projectData.project.startDate}~{projectData.project.endDate}</span>
                    </div>
                    <div>
                        <label>팀원</label>
                        <span>
                            {projectData.userList.map((user, index) => (
                                <span key={index}>{user}</span>
                            ))}
                        </span>
                    </div>
                    <div>
                        <label>프로젝트 설명</label>
                        <div>{projectData.project.content}</div>
                    </div>
                </div>
                <img/>
            </div>
            <div className={styles.button}>
                <input type="button" value="빠른 출석 바로가기" onClick={async () => {
                   navigate(`/attendance/${await getQuickAttendance(projectData.project.pid)}`); 
                }}/> 
            </div>
        </div>
    </div>
    );
};