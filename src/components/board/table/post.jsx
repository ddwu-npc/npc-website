import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { readUser } from "api/user";

import styles from "./style.module.scss";

export default ({ link, post, empty }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!empty && post) {
      const fetchData = async () => {
        const userData = await readUser(post.userNo);
        setUser(userData);
      };

      fetchData();
    }
  }, [empty, post]);
  
  if (empty) return <div className={styles.post}></div>;

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
      <div>{post.rangePost}</div>
      <div>{post.title}</div>
      <div>
        {/* <img className={styles.profile} src={user.profile} /> */}
        {user ? user.nickname : "로딩 중"}
      </div>
      <div>
        {post.havePostfile==1? "O":""}
      </div>
      <div>{post.createDate}</div>
    </Link>
  );
};
