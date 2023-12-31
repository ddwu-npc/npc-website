import { useState, useRef } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { usePos } from "hooks";

import CodeMirror from "@uiw/react-codemirror";
import { githubLightInit } from "@uiw/codemirror-theme-github";
import { markdown } from "@codemirror/lang-markdown";

import { getUserno, addProjectUser, readUserInfo} from "api/user";
import { getProjectInfo, createProject, updateProject, insertProjectUser, removeProjectUser, updateProjectLeader } from "api/project";

import Header from "components/commons/header";

import styles from "./style.module.scss";

let isNew = null;

export const loader = async ({ params }) => {
    if (params.pid) {
        const data = await getProjectInfo(params.pid);
        isNew = false;
        return data;
    } 
    else {
        const userno = await getUserno();
        const userInfo = await readUserInfo(userno);
        const currentDate = new Date().toISOString().slice(0, 10); // YYYY-MM-DD 형식
        
        const data = {
            projectRes: {
                pid: -1,
                pname: "",
                type: "팀",
                tname: "",
                process: "개발 중",
                content: "",
                startDate: currentDate,
                endDate: currentDate,
                leader: userInfo.nickname,
            },
            userList: {

            }
        };

        isNew = true;

        return data;
    }
}

export default () => {
    usePos("프로젝트");
    
    const navigate = useNavigate();
    const [project, setProject] = useState(useLoaderData());
    const [newUserName, setNewUserName] = useState("");
    // const [users, setUsers] = useState(project.userList); 


    const handleAddButtonClick = async () => {
        const response = await addProjectUser(newUserName);
        if (response.userNo  !== -1) {
            const newUser = { [newUserName]: response.dept }; 
            setProject({
                ...project,
                userList: { ...project.userList, ...newUser }
            });
            if (!isNew){
                await insertProjectUser(newUserName, project.projectRes.pid);
            }
          } else {
            alert("존재하지 않는 닉네임입니다.");
        }
       
    };

    const handleDeleteButtonClick = async (nickname) => {
        
        if (!isNew){
            await removeProjectUser(nickname, project.projectRes.pid);
        }
        const updatedUserList = { ...project.userList };
        delete updatedUserList[nickname];
        setProject({ ...project, userList: updatedUserList });
    };

    const handleChangeButtonClick = async (nickname) => {
        
        if (!isNew){
            await updateProjectLeader(nickname, project.projectRes.pid);
        }
        setProject({...project, projectRes: {...project.projectRes, leader: nickname}});
    };

    return (
        <div className={styles.root}>
            <Header text="프로젝트" src="/project" />
            <form className={styles.edit} >
                <p>
                    <label>프로젝트 이름</label>
                    <input 
                        type="text"
                        name="pname" 
                        defaultValue={project.projectRes.pname}
                        onChange={(e) => setProject({...project, projectRes: {...project.projectRes, pname: e.target.value}})}/>
                </p>
                <p>
                    <label>팀 명</label>
                    <input 
                        type="text"
                        name="tname" 
                        defaultValue={project.projectRes.tname}
                        onChange={(e) => setProject({...project, projectRes: {...project.projectRes, tname: e.target.value}})}/>
                </p>
                <p>
                    <label>진행 상황</label>
                    <select 
                        name="process"
                        defaultValue={project.projectRes.process}
                        onChange={(e) => setProject({...project, projectRes: {...project.projectRes, process: e.target.value}})}>
                        <option value={"개발 중"}>개발 중</option>
                        <option value={"개발 완료"}>개발 완료</option>
                    </select>
                </p>
                <p>
                    <label>팀 / 개인</label>
                    <select 
                        name="type"
                        defaultValue={project.projectRes.type}
                        onChange={(e) => setProject({...project, projectRes: {...project.projectRes, type: e.target.value}})}>
                        <option value={"팀"}>팀</option>
                        <option value={"개인"}>개인</option>
                    </select>
                </p>
                <p>
                    <label>프로젝트 기간</label>
                    <input type="date" name="startDate" defaultValue={project.projectRes.startDate}
                        max={project.endDate}
                        onChange={(e) => setProject({...project, projectRes: {...project.projectRes, startDate: e.target.value}})}/>
                    {" ~ "}
                    <input type="date" name="endDate" defaultValue={project.projectRes.endDate}
                        min={project.startDate}
                        onChange={(e) => setProject({...project, projectRes: {...project.projectRes, endDate: e.target.value}})}/>
                </p>
                
                <div>
                <p>
                    <label>팀원</label><br></br>
                    <input
                        type="text"
                        placeholder="이름"
                        value={newUserName}
                        onChange={(e) => setNewUserName(e.target.value)}
                    />
                    <button type="button" onClick={handleAddButtonClick}>추가</button><br></br><br></br>
                    <input type="hidden" name="userList" onChange={(e) => setProject({ ...project, UserList: { ...project.UserList, endDate: e.target.value }})}/>
                    <span>
                        {Object.entries(project.userList).map(([name, department], index) => (
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
                                {project.projectRes.leader === name ? `[팀장] ${name}` : `${name}`}
                                {department === 'DEVELOPER' ? ` - 개발팀 ` : ``}
                                {department === 'DESIGN' ? ` - 디자인팀 ` : ``}
                                {department === 'PLAN' ? ` - 기획팀 ` : ``}
                                {project.projectRes.leader !== name && (
                                    <span>
                                        <button type="button" onClick={() => handleChangeButtonClick(name)}>팀장 위임</button> &nbsp; &nbsp;
                                        <button type="button" onClick={() => handleDeleteButtonClick(name)}>삭제</button>
                                    </span>
                                )}
                                <br></br>
                            </span>
                        ))}
                    </span>
                    <br></br>
                </p>
                </div>
                <div>
                    <label>프로젝트 설명</label>
                    <CodeMirror
                        height= "400px"
                        value={project.projectRes.content}
                        theme={githubLightInit({
                            settings: {
                                fontFamily: `"Fira Code", "Fira Mono", Menlo, Consolas, "DejaVu Sans Mono", monospace`,
                                background: "rgb(250, 250, 250)",
                            },
                        })}
                        basicSetup={{ highlightActiveLine: false, lineNumbers: false }}
                        extensions={[markdown()]}
                        onChange={(value, viewUpdate) =>
                            setProject({
                                ...project,
                                projectRes: {
                                    ...project.projectRes,
                                    content: value
                                }
                            })
                        }                    />
                </div>
                <div className={styles.button}>
                    {!isNew
                        ? <input type="button" value="수정"
                            onClick={async () => {
                                if (project.projectRes.pname === ""){
                                    alert("프로젝트 이름을 입력하세요.");
                                } else if (project.projectRes.tname === ""){
                                    alert("팀 명을 입력하세요.");
                                } else if (project.projectRes.content === ""){
                                    alert("프로젝트 설명을 입력하세요.");
                                } else{
                                    if (await updateProject(project)) navigate(`/project/${project.projectRes.pid}`);
                                    else alert("프로젝트 수정에 실패했습니다.\n해당 현상이 반복되면 관리자에게 문의하세요.");
                                }
                            }}/>
                        : <input type="button" value="생성"
                            onClick={async () => {
                                if (project.projectRes.pname === ""){
                                    alert("프로젝트 이름을 입력하세요.");
                                } else if (project.projectRes.tname === ""){
                                    alert("팀 명을 입력하세요.");
                                } else if (project.projectRes.content === ""){
                                    alert("프로젝트 설명을 입력하세요.");
                                } else{
                                    if (await createProject(project)) navigate(`/project`);
                                    else alert("프로젝트 생성에 실패했습니다.\n해당 현상이 반복되면 관리자에게 문의하세요.");
                                }
                            }}/> }
                </div>
            </form>
        </div>
    );
}