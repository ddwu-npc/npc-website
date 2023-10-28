import { useLoaderData } from "react-router";
import { Icon } from "@iconify/react";

import { usePos } from "hooks";
import { readUserInfo, getLoginSession } from "api/user";
import { getPostList, getBName } from "api/board";

import BoardBox from "./boardBox";
import NoticeBox from "./noticeBox";
import Profile from "./profile";

import styles from "./style.module.scss";


export const loader = async () => {
  const userId = await getLoginSession();

  const data = {};
  data.user = await readUserInfo();
  data.pinedBoard = [
    { board_id: 1, bName: await getBName(1), postList: await getPostList(0) },
    { board_id: 2, bName: await getBName(2), postList: await getPostList(1) },
  ];
  return data;
}

export default () => {
  usePos("메인");
  const { pinedBoard } = useLoaderData()

  return (
    <div className={styles.main}>
      <div className={`${styles.boxContainer}`}>
        <BoardBox 
          icon={<Icon icon="jam:alert-f" color="#BF4A4A"/>}
          boardData={pinedBoard[0]}/>
        {/* <BoardBox 
          icon={<Icon icon="bi:calendar-check-fill" color="#4C4ABF"/>}
          title="빠른 출석"
          posts={["안녕하세요1234abcde", "안녕하세요1234abcde", "안녕하세요1234abcde", "안녕하세요1234abcde", "안녕하세요1234abcde", "안녕하세요1234abcde"]}/>*/}
        <BoardBox 
          icon={<Icon icon="fluent:notebook-16-filled" color="#BF9E4A"/>}
          boardData={pinedBoard[1]}/>
      </div>
      <div className={`${styles.boxContainer}`}>
        <Profile/>
        <NoticeBox
          icon={<Icon icon="bi:bookmark-fill" color="#BF4A4A"/>}
          title="일정"
          posts={["안녕하세요1234abcde"]}/>
        <NoticeBox
          icon={<Icon icon="bi:bookmark-fill" color="#BF4A4A"/>}
          title="할 일"
          posts={["안녕하세요1234abcde"]}/>
      </div>
    </div>
  );
};
