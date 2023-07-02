import { Link, useLoaderData } from "react-router-dom";
import { Icon } from "@iconify/react";

import styles from "./style.module.scss";

export default () => {
  return (
    <Link className={styles.postButton}>
      <Icon icon="bi:plus-square" />
      게시글 작성하기
    </Link>
  );
};
