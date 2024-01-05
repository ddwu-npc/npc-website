import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";

import styles from "./style.module.scss";

import { getPostList } from "api/board";
import { getToken } from "api/jwtToken";
import Header from "./header";
import Post from "./post";
import Nav from "./nav";

export default () => {
  const { postPaging, search, boardId } = useLoaderData();
  const [page, setPage] = useState(1);
  console.log(postPaging.postList);
  const [curPostList, setCurPostList] = useState(postPaging.postList);
  const [pageInfo, setPageInfo] = useState(postPaging.pageInfo);
  const token = getToken();

  useEffect(() => {
    setPage(1); // boardId가 변경될 때 항상 페이지를 1로 설정합니다.
  }, [boardId]);

  // 페이지가 바뀌면 불러옴
  useEffect(() => {
    const fetchData = async () => {
      const updatedPostPaging = await getPostList(boardId, search, page, token);
      setCurPostList(updatedPostPaging.postList);
      setPageInfo(updatedPostPaging.pageInfo);
    };

    fetchData(); 
  }, [boardId, page]);

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
        cur={pageInfo[0] + 1}
        max={pageInfo[1]}
        setPage={setPage}
      />
    </div>
  );
};
