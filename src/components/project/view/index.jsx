import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

import { usePos } from "hooks";

import Header from "components/commons/header";
import Tag from "components/commons/tag";
import styles from "./style.module.scss";

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
            <div className={styles.content}>
                <div className={styles.describtion}>
                    <div>
                        <label>장르</label>
                        <span>장르</span>
                    </div>
                    <div>
                        <label>팀장</label>
                        <span>홍길동</span>
                    </div>
                    <div>
                        <label>개발 기간</label>
                        <span>2023.00.00 ~ 2023.00.00</span>
                    </div>
                    <div>
                        <label>팀원</label>
                        <span>기획 홍길동 디자인 홍길동 개발 홍길동</span>
                    </div>
                    <div>
                        <label>프로젝트 설명</label>
                        <div>더미 텍스트입니다.더미 텍스트입니다.더미 텍스트입니다.더미 텍스트입니다.더미 텍스트입니다.더미 텍스트입니다.더미 텍스트입니다.더미 텍스트입니다.더미 텍스트입니다.더미 텍스트입니다.더미 텍스트입니다.더미 텍스트입니다.더미 텍스트입니다.더미 텍스트입니다.더미 텍스트입니다.더미 텍스트입니다.더미 텍스트입니다.</div>
                    </div>
                </div>
                <img/>
            </div>
            <div className={styles.button}>
                <input type="button" value="빠른 출석 바로가기" onClick={async () => {
                   navigate(`/attendance/${await getQuickAttendance(project.pid)}`); 
                }}/> 
            </div>
        </div>
    </div>
    );
};