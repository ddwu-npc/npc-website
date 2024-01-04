import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

import Tag from "components/commons/tag";
import { getProcessColor } from "../optionColor";
import styles from "./style.module.scss";

export default ({ link, project, empty }) => {
  if (empty) return <div className={styles.post}></div>;

  const processColor = getProcessColor(project.process);

  return (
    <Link className={styles.post} to={link}>
      <div>
        {project.pid}
      </div>
      <div>{project.pname}</div>
      <div>{project.tname}</div>
      <Tag text={project.process} color={processColor}/>
      <div>{project.startDate} ~ {project.endDate}</div>
    </Link>
  );
};
