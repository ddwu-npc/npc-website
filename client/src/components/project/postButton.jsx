import { Link, useLoaderData } from "react-router-dom";
import { Icon } from "@iconify/react";

import styles from "./style.module.scss";

export default () => {
  return (
    <Link className={styles.postButton} to="create">
      <Icon icon="bi:plus-square" />
      프로젝트 생성하기
    </Link>
  );
};
