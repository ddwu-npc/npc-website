import { useLoaderData } from "react-router";
import { usePos } from "hooks";

import { readUserInfo, getUserno } from "api/user";
import { getPostListByUserId } from "api/board";
import { getCommentListByUserId } from "api/post";

import Header from "components/commons/header";
import Profile from "./profile";
import Written from "./written";
import Setting from "./setting";
import styles from "./style.module.scss";

export const loader = async ({ request, params }) => {
  const userId = await getUserno();

  const data = {};
  data.user = await readUserInfo(userId);
  data.postList = await getPostListByUserId(userId);
  data.commentList = await getCommentListByUserId(userId);
  return data;
};

export default () => {
  usePos("마이페이지");

  const { postList, commentList } = useLoaderData();

  return (
    <div className={styles.container}>
      <div className={styles.setting}><Setting/></div>
      <div className={styles.root}>  
        <Header src="/" text="마이페이지" />
        <Profile />
        <div className={styles.writtens}>
          <Written title="내가 쓴 게시물" {...postList} />
          <Written title="내가 쓴 댓글" {...commentList} />
        </div>
      </div>
    </div>
  );
};