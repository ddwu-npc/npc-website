import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import styles from "./style.module.scss";

import Header from "./header";
import Post from "./post";
import Nav from "./nav";

export default (props) => {
  const { postList } = useLoaderData();
  const [page, setPage] = useState(1);

  postList.sort((a, b) => {
    if (a.important != b.important) {
      return a.important == 1 ? -1 : 1;
    }
    return a.post_id - b.post_id;
  });

  const curPostList = postList.slice((page - 1) * 11, (page - 1) * 11 + 11);
  const emptyPosts = [];
  while (curPostList.length + emptyPosts.length < 11) {
    emptyPosts.push(
      <div key={`board_table_empty_${emptyPosts.length}`}>
        <Post empty={true} />
      </div>
    );
  }

  return (
    <div className={styles.table}>
      <Header />
      <div className={styles.posts}>
        {curPostList.map((post) => (
          <div key={`board_table_${post.postId}`}>
            <Post link={`post/${post.postId}`} post={post} />
          </div>
        ))}
        {emptyPosts}
      </div>
      <Nav
        cur={page}
        max={Math.floor(postList.length / 11) + 1}
        setPage={setPage}
      />
    </div>
  );
};
