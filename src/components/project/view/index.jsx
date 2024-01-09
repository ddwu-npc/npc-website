import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useLoaderData, useNavigate } from "react-router-dom";

import { usePos } from "hooks";

import Header from "components/commons/header";
import Tag from "components/commons/tag";
import styles from "./style.module.scss";

import { readUserInfo, getUserno } from "api/user";
import { getProjectInfo, deleteProject, getQuickAttendance } from "api/project";
import { createAttendance } from "api/attendance";
import { getProcessColor } from "../optionColor";

import { Icon } from "@iconify/react"; 

export const loader = async ({ params }) => {
    const userId = await getUserno();
    const pid = params.pid;
    const data = await getProjectInfo(pid);
    data.user = await readUserInfo(userId);
    return data;
};

export default () => {
    usePos("프로젝트");
    const navigate = useNavigate();

    const projectData = useLoaderData();
    const [option, setOption] = useState(false);

    const isLeader = projectData.projectRes.leader === projectData.user.nickname
    const isUserInList = Object.keys(projectData.userList).some(
        (name) => name === projectData.user.nickname
    );
    const processColor = getProcessColor(projectData.projectRes.process);

    const handleQuickAttendance = async () => {
        const quickAttendanceId = await getQuickAttendance(projectData.projectRes.pid);
        if (quickAttendanceId === -100) {
            alert("현재 열린 출석이 없습니다.");
        } else {
            navigate(`/attendance/${quickAttendanceId}`);
        }
    };

    return (
    <div className={styles.root}>
        <Header text="프로젝트" src="/project"/>
        <div className={styles.view}>
           <div className={styles.title}>
                <Tag text={projectData.projectRes.process} color={processColor}/>
                <h2>{projectData.projectRes.pname}</h2>
                <div className={styles.option}>
                    {isLeader && (
                        <Icon 
                            icon="bi:three-dots-vertical" color="#7E7E7E" 
                            onClick={() => setOption(!option)}/>
                    )}
                    {option && isLeader && (
                        <div>
                            <div onClick={async () => {
                                const result = await createAttendance(projectData.projectRes.pid);
                                if(result) {
                                    navigate(`/attendance/${result}`);
                                }
                                else {
                                    alert("출석 삭제에 실패했습니다.\n해당 현상이 반복될 시 관리자에게 문의바랍니다.")  
                                }
                            }}>출석 생성</div>
                            <div onClick={() => navigate("edit")}>수정</div>
                            <div onClick={async () => {
                                if (await deleteProject(projectData.projectRes.pid)) navigate("/project");
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
                        <label>팀 명</label>
                        <span>{projectData.projectRes.tname}</span>
                    </div>
                    <div>
                        <label>팀 / 개인</label>
                        <span>{projectData.projectRes.type}</span>
                    </div>
                    <div>
                        <label>팀장</label>
                        <span>{projectData.projectRes.leader}</span>
                    </div>
                    <div>
                        <label>개발 기간</label>
                        <span>{projectData.projectRes.startDate}~{projectData.projectRes.endDate}</span>
                    </div>
                    <div>
                        <label>팀원</label><br></br>
                        <span>
                        {Object.entries(projectData.userList).map(([name, department], index) => (
                            <span
                                key={index}
                                className={
                                    department === "개발팀"
                                        ? "dev-team"
                                        : department === "디자인팀"
                                        ? "design-team"
                                        : department === "기획팀"
                                        ? "planning-team"
                                        : ""
                                }
                            >
                            {department === 'DEVELOPER' ? `개발팀 ` : ``}
                            {department === 'DESIGN' ? `디자인팀 ` : ``}
                            {department === 'PLAN' ? `기획팀 ` : ``}
                            {name}
                            <br></br>
                            </span>
                        ))}
                    </span>
                    <br></br>
                    </div>
                    <div>
                        <label>프로젝트 설명</label>
                        <ReactMarkdown>{projectData.projectRes.content}</ReactMarkdown>
                    </div>
                </div>
            </div>
            <div className={styles.button}>
                {isUserInList && (
                    <input
                        type="button"
                        value="빠른 출석 바로가기"
                        onClick={handleQuickAttendance}
                    />
                )}
            </div>
        </div>
    </div>
    );
};