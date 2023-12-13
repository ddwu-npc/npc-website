import { Outlet, useLoaderData, redirect } from "react-router-dom";
import { usePos } from "hooks";
import { getBName } from "api/board";
import { readPost, createPost, updatePost, readComment } from "api/post";
import { readUser } from "api/user";

import Header from "components/commons/header";
import Edit from "./edit";
import Read from "./read";

import styles from "./style.module.scss";

const posLoader = async ({ params }) => {
  const data = {};

  data.boardId = params.boardId;
  data.bName = await getBName(data.boardId);
  data.pos = `게시판 >  ${data.bName}`;

  return data;
};

const dataLoader = async ({ request, params }) => {
  const data = {};
  data.params = params.boardId;

  if (params.postId) {
    data.postId = params.postId;
    console.log("data.postId", params.postId);
    data.post = await readPost(data.postId);

    if (new URL(request.url).pathname.indexOf("edit") === -1) {
      data.comments = await readComment(data.postId);
      for (const comment of data.comments) {
        comment.user = await readUser(comment.userno);
      }
      data.user = await readUser(data.post.userno);
    }
  }
  return data;
};

const uploadAction = async ({ request, params }) => {
  const formData = await request.formData();
  const post = Object.fromEntries(formData);
  console.log(post);

  const boardId = params.boardId;
  if (params.postId) {
    const postId = params.postId;

    await updatePost(postId, post);
    //alert(`게시글 수정 완료 \n${JSON.stringify(post)}`);

    return redirect(`/board/${boardId}/post/${postId}`);
  }
  await createPost(boardId, post);
  //alert(`게시글 생성 완료 \n${JSON.stringify(post)} ${boardId}`);

  return redirect(`/board/${boardId}`);
};

export const Post = () => {
  const { boardId, bName, pos } = useLoaderData();
  usePos(pos);

  return (
    <div className={styles.root}>
      <Header text={bName} src={`/board/${boardId}`}/>
      <Outlet />
    </div>
  );
};

export default {
  element: <Post />,
  loader: posLoader,
  action: uploadAction,
  children: [
    {
      path: "",
      element: <Edit />,
      loader: dataLoader,
    },
    {
      path: ":postId",
      element: <Read />,
      loader: dataLoader,
    },
    {
      path: ":postId/edit",
      element: <Edit />,
      loader: dataLoader,
      action: uploadAction,
    },
  ],
};
