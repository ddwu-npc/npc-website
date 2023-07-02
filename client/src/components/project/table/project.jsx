import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { readUser } from "api/user";

import styles from "./style.module.scss";

export default ({ link, project, empty }) => {
  if (empty) return <div className={styles.post}></div>;

  return (
    <Link className={styles.post} to={link}>
      <div>
        {project.pid}
      </div>
      <div>{project.pname}</div>
      <div>[NAME]</div>
      <div>개발 중</div>
      <div>2023.07.02 ~ 2023.08.31</div>
    </Link>
  );
};
