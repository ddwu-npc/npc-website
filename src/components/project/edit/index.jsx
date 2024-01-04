import { useState, useRef } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { usePos } from "hooks";

import CodeMirror from "@uiw/react-codemirror";
import { githubLightInit } from "@uiw/codemirror-theme-github";
import { markdown } from "@codemirror/lang-markdown";

import { readUserInfo, getUserno } from "api/user";
import { getProjectInfo, getNewProjectInfo, createProject, updateProject } from "api/project";

import Header from "components/commons/header";

import styles from "./style.module.scss";

export const loader = async ({ params }) => {
    if (params.pid) {
        const data = await getProjectInfo(params.pid);
        return data;
    } 
    else {
        const userno = await getUserno();    
        const data = await getNewProjectInfo(userno);
        const currentDate = new Date().toISOString().slice(0, 10); // YYYY-MM-DD 형식
        return {
            pname: "",
            type: 0,
            tname: "",
            process: "",
            startDate: currentDate,
            endDate: currentDate,
            content: "",
            member: []
        };
    }
}

export default () => {
    usePos("프로젝트");
    
    const navigate = useNavigate();
    const [project, setProject] = useState(useLoaderData());

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
                    {project.projectRes.pid 
                        ? <input type="button" value="수정"
                            onClick={async () => {
                                if (await updateProject(project)) navigate(`/project/${project.projectRes.pid}`);
                                else alert("프로젝트 수정에 실패했습니다.\n해당 현상이 반복되면 관리자에게 문의하세요.");
                            }}/>
                        : <input type="button" value="생성"
                            onClick={async () => {
                                if (await createProject(project.projectRes)) navigate(`/project`);
                                else alert("프로젝트 생성에 실패했습니다.\n해당 현상이 반복되면 관리자에게 문의하세요.");
                            }}/> }
                </div>
            </form>
        </div>
    );
}