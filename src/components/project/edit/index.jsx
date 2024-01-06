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

    const handleAddButtonClick = async () => {
        const response = await addProjectUser(newUserName);
        console.log("확확", response);
        
        if (response.userNo  !== -1) {
            alert("Name added successfully!");
          } else {
            alert("존재하지 않는 닉네임입니다.");
        }
       
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
                    <label>진행 상황</label>
                    <select 
                        name="process"
                        defaultValue={project.projectRes.process}
                        onChange={(e) => setProject({...project, projectRes: {...project.projectRes, process: e.target.value}})}>
                        <option value={1}>팀</option>
                        <option value={2}>개인</option>
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
                                <button>삭제</button><br></br>
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