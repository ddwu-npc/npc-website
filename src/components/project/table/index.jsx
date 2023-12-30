import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import styles from "./style.module.scss";

import Header from "./header";
import Project from "./project";
import Nav from "./nav";

export default (props) => {
  const { projectList } = useLoaderData();
  const [page, setPage] = useState(1);

  const curProjectList = projectList.slice((page - 1) * 11, (page - 1) * 11 + 11);
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
      <Nav
        cur={page}
        max={Math.floor(projectList.length / 11) + 1}
        setPage={setPage}
      />
    </div>
  );
};
