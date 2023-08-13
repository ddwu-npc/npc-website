import { Link } from "react-router-dom";

import styles from "./style.module.scss";

export default (props) => {
  return (
    <div className={styles.tap}>
      {props.link != null ? (
        <Link to={props.link}>{props.value}</Link>
      ) : (
        <div>{props.value}</div>
      )}
      {props.dropdown}
    </div>
  );
};
