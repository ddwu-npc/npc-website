import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { readUser } from "api/user";

import styles from "./style.module.scss";

export default ({ link, post, empty }) => {
  if (empty) return <div className={styles.post}></div>;

  const [user, setUser] = useState({ userno:"", profile: "", nickname: "" });

  useEffect(() => {
    async function findUser() {
      //const user = await readUser(post.userno);
      const user = { userno:1, profile: "profile", nickname: "[NAME]"};
      setUser(user);
    }
    findUser();
  });

  return (
    <Link
      className={`${styles.post} ${
        post.important === 1 ? styles.important : ""
      }`}
      to={link}
    >
      <div>
        <Icon
          className={styles.star}
          icon="bxs:star"
          color={post.important === 1 ? "#FFB636" : "#EDEDED"}
        />
        {post.post_id}
      </div>
      <div>{post.range}</div>
      <div>{post.title}</div>
      <div>
        <img className={styles.profile} src={user.profile} />
        {user.nickname}
      </div>
      <div></div>
      <div>{post.create_date}</div>
    </Link>
  );
};
