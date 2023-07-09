import { useState, useRef } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

import CodeMirror from "@uiw/react-codemirror";
import { githubLightInit } from "@uiw/codemirror-theme-github";
import { markdown } from "@codemirror/lang-markdown";

import { getProjectInfo, createProject, updateProject } from "api/project";

import Header from "components/commons/header";

import styles from "./style.module.scss";

export const loader = async ({ params }) => {
    if (params.pid) {
        return await getProjectInfo(params.pid);
    } 
    else {
        return {
            pname: "",
            type: 0,
            tname: "",
            process: "",
            startDate: "2023-06-06",
            endDate: "2023-07-07",
            description: "",
            member: []
        };
    }
}

export default () => {
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
                        defaultValue={project.pname}
                        onChange={(e) => setProject({...project, pname: e.target.value})}/>
                </p>
                <p>
                    <label>진행 상황</label>
                    <select 
                        name="process"
                        defaultValue={project.process}
                        onChange={(e) => setProject({...project, process: e.target.value})}>
                        <option value={1}>팀</option>
                        <option value={2}>개인</option>
                    </select>
                </p>
                <p>
                    <label>프로젝트 기간</label>
                    <input type="date" name="startDate" defaultValue={project.startDate}
                        max={project.endDate}
                        onChange={(e) => setProject({...project, startDate: e.target.value})}/>
                    {" ~ "}
                    <input type="date" name="endDate" defaultValue={project.endDate}
                        min={project.startDate}
                        onChange={(e) => setProject({...project, endDate: e.target.value})}/>
                </p>
                <div>
                    <CodeMirror
                        height= "400px"
                        value={project.description}
                        theme={githubLightInit({
                            settings: {
                                fontFamily: `"Fira Code", "Fira Mono", Menlo, Consolas, "DejaVu Sans Mono", monospace`,
                                background: "rgb(250, 250, 250)",
                            },
                        })}
                        basicSetup={{ highlightActiveLine: false, lineNumbers: false }}
                        extensions={[markdown()]}
                        onChange={(value, viewUpdate) => setProject({...project, description: value})}
                    />
                </div>
                <div className={styles.button}>
                    {project.pid 
                        ? <input type="button" value="수정"
                            onClick={async () => {
                                if (await updateProject(project)) navigate(`/project/${project.pid}`);
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