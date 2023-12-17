import { useLoaderData } from "react-router-dom";

import { usePos } from "hooks";
import { getPostList, getBName } from "api/board";

import styles from "./style.module.scss";

import PostButton from "./postButton";
import Search from "./search";
import Table from "./table";
import post from "./post";

export const postRouter = post;

export async function loader({ params, request }) {
  const searchParmas = new URL(request.url).searchParams;
  const search = {
    rangePost: searchParmas.get("rangePost"),
    searchRange: searchParmas.get("searchRange"),
    text: searchParmas.get("text"),
  };

  console.log("search-index", search);

  const boardId = params.boardId;
  const postList = await getPostList(boardId, search);
  const pos = `게시판 >  ${await getBName(boardId)}`;

  return { boardId, postList, pos };
}

export default () => {
  const { pos } = useLoaderData();
  usePos(pos);

  return (
    <div className={styles.board}>
      <div className={styles.upper}>
        <PostButton />
        <Search />
      </div>
      <Table />
    </div>
  );
};
