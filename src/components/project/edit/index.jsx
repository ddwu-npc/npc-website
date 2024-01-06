import { useState, useRef } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { usePos } from "hooks";

import CodeMirror from "@uiw/react-codemirror";
import { githubLightInit } from "@uiw/codemirror-theme-github";
import { markdown } from "@codemirror/lang-markdown";

import { getUserno, addProjectUser } from "api/user";
import { getProjectInfo, getNewProjectInfo, createProject, updateProject } from "api/project";

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
        const data = await getNewProjectInfo(userno);
        const currentDate = new Date().toISOString().slice(0, 10); // YYYY-MM-DD 형식
        
        console.log("확확", data.projectRes.pid);
        data.projectRes.pname = "";
        data.projectRes.type = "";
        data.projectRes.tname = "";
        data.projectRes.process = "";
        data.projectRes.content = "";

        isNew = true;

        return data;
    }
}

export default () => {
    usePos("프로젝트");
    
    const navigate = useNavigate();
    const [project, setProject] = useState(useLoaderData());
    const [newUserName, setNewUserName] = useState("");
    const [users, setUsers] = useState(project.userList); 


    const handleAddButtonClick = async () => {
        const response = await addProjectUser(newUserName);
        console.log("확확", response);
        if (response.userNo  !== -1) {
            const newUser = { [newUserName]: response.dept }; 
            setProject({
                ...project,
                userList: { ...project.userList, ...newUser }
            });
          } else {
            alert("존재하지 않는 닉네임입니다.");
        }
       
    };

    const handleDeleteButtonClick = async (nickname) => {
        const updatedUserList = { ...project.userList };
        delete updatedUserList[nickname];
        setProject({ ...project, userList: updatedUserList });
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
                        <option value={1}>0%</option>
                        <option value={2}>10%</option>
                        <option value={3}>20%</option>
                        <option value={4}>30%</option>
                        <option value={5}>40%</option>
                        <option value={6}>50%</option>
                        <option value={7}>60%</option>
                        <option value={8}>70%</option>
                        <option value={9}>80%</option>
                        <option value={10}>90%</option>
                        <option value={11}>100%</option>
                    </select>
                </p>
                <p>
                    <label>개인 / 팀</label>
                    <select 
                        name="type"
                        defaultValue={project.projectRes.type}
                        onChange={(e) => setProject({...project, projectRes: {...project.projectRes, type: e.target.value}})}>
                        <option value={"1"}>팀</option>
                        <option value={"2"}>개인</option>
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
                    <button type="button" onClick={handleAddButtonClick}>추가</button><br></br>
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
                                {name} - {department}
                                <button type="button" onClick={() => handleDeleteButtonClick(name)}>삭제</button><br></br>
                            </span>
                        ))}
                    </span>
                </p>
                </div>
                <div>
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
                                if (await updateProject(project)) navigate(`/project/${project.projectRes.pid}`);
                                else alert("프로젝트 수정에 실패했습니다.\n해당 현상이 반복되면 관리자에게 문의하세요.");
                            }}/>
                        : <input type="button" value="생성"
                            onClick={async () => {
                                if (await createProject(project)) navigate(`/project`);
                                else alert("프로젝트 생성에 실패했습니다.\n해당 현상이 반복되면 관리자에게 문의하세요.");
                            }}/> }
                </div>
            </form>
        </div>
    );
}