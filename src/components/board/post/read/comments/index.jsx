import { useLoaderData } from "react-router-dom";
import { Icon } from "@iconify/react";

import CommnetInput from "./input";
import Commnet from "./comment";

import styles from "./style.module.scss";

export default () => {
  const { comments } = useLoaderData();

  return (
    <form className={styles.comments}>
      <div className={styles.title}>
        <Icon icon="cil:speech" /> 댓글
      </div>
      <hr />
      <CommnetInput />
      {comments.map((comment, idx) => (
        <Commnet comment={comment} key={`comment_${idx}`} />
      ))}
    </form>
  );
};
