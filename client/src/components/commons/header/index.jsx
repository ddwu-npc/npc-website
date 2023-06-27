import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

import styles from "./style.module.scss";

export default (props) => {
  return (
    <div className={styles.header}>
      <Link className={styles.button} to={props.src}>
        <Icon icon="solar:alt-arrow-left-outline" color="white" />
      </Link>
      {props.text}
    </div>
  );
};
