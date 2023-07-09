import { Icon } from "@iconify/react";
import { Link, useNavigate, useNavigationType } from "react-router-dom";

import styles from "./style.module.scss";

export default ({text, src}) => {
  const navigate = useNavigate();
  const navigationType = useNavigationType();

  return (
    <div className={styles.header}>
      <Link className={styles.button} to={src} 
        onClick={() => {
          if(src) {
            navigate(src);
          }
          else {
            if(navigationType === "PUSH") navigate(-1);
            else navigate("/");
          }
        }}>
        <Icon icon="solar:alt-arrow-left-outline" color="white" />
      </Link>
      {text}
    </div>
  );
};
