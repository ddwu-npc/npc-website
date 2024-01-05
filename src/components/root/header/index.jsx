import { Link } from "react-router-dom";
import styles from "./style.module.scss";

import Upper from "./upper";
import logo from "components/commons/img/logo.png";
import Nav from "./nav";

export default (props) => {
  return (
    
    <div className={styles.header}>
      <Upper />
      <Link to="/">
        <img src={logo} />
      </Link>
      <Nav pos={props.pos} />
    </div>
  );
};
