import { useLoaderData } from "react-router-dom";

import Board from "../components/board";
import { getPostList } from "../api/board";

export async function loader({ params }) {
  const boardId = params.boardId;
  const boardName = "hh";
  const postList = await getPostList(boardId);

  return { boardId, postList };
}

export default ({ setPos }) => {
  const { boardName } = useLoaderData();
  setPos(boardName);

  return <Board />;
};
