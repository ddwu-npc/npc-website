import styles from "./style.module.scss";

import Slogan from "./slogan";
import Hello from "./hello";

export default () => {
  return (
    <div className={styles.upper}>
      <Slogan />
      <Hello />
    </div>
  );
};
