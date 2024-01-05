import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import styles from "./style.module.scss";
import Header from "./header";
import Project from "./project";
import Nav from "./nav";
import { getProjectList } from "api/project"; 

export default (props) => {
  const { projectPaging } = useLoaderData();
  const [page, setPage] = useState(1);
  const [curProjectList, setCurProjectList] = useState(projectPaging.projects);
  const [pageInfo, setPageInfo] = useState(projectPaging.pageInfo);

  useEffect(() => {
    const fetchData = async () => {
      const updatedProjectPaging = await getProjectList({
        range: "", 
        searchRange: "", 
        text: "", 
      }, page);

      setCurProjectList(updatedProjectPaging.projects);
      setPageInfo(updatedProjectPaging.pageInfo);
    };

    fetchData();
  }, [page]); // 

  const emptyProjects = [];
  while (curProjectList.length + emptyProjects.length < 11) {
    emptyProjects.push(
      <div key={`project_table_empty_${emptyProjects.length}`}>
        <Project empty={true} />
      </div>
    );
  }

  return (
    <div className={styles.table}>
      <Header />
      <div className={styles.posts}>
        {curProjectList.map((project) => (
          <div key={`project_table_${project.pid}`}>
            <Project project={project} link={`${project.pid}`} />
          </div>
        ))}
        {emptyProjects}
      </div>
      <Nav cur={pageInfo[0]} max={pageInfo[1]} setPage={setPage} />
    </div>
  );
};
