import { useLoaderData } from "react-router";
import { Icon } from "@iconify/react";

import { usePos } from "hooks";
import { getToken } from "api/jwtToken";
import { getUserno, readUserInfo } from "api/user";
import { getPostList, getBName } from "api/board";

import BoardBox from "./boardBox";
import NoticeBox from "./noticeBox";
import AttendanceBox from "./attendanceBox";
import Profile from "./profile";

import styles from "./style.module.scss";
import { SocialIcon } from 'react-social-icons/component'
import 'react-social-icons/instagram'
import 'react-social-icons/youtube'

export const loader = async () => {
  const userno = await getUserno();
  const token = getToken();
  const data = {};
  data.user = await readUserInfo(userno);
  data.pinedBoard = [
    { board_id: 1, bName: await getBName(1), postPaging: await getPostList(1, null, 1, token) },
    { board_id: 2, bName: await getBName(2), postPaging: await getPostList(2, null, 1, token) },
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
        <BoardBox 
          icon={<Icon icon="fluent:notebook-16-filled" color="#BF9E4A"/>}
          boardData={pinedBoard[1]}/>
      </div>
      <div className={`${styles.boxContainer}`}>
        <Profile/>
        <AttendanceBox
          icon={<Icon icon="bi:calendar-check-fill" color="#4C4ABF"/>} />
        <NoticeBox
          icon={<Icon icon="bi:bookmark-fill" color="#BF4A4A"/>}
          title="일정"
          posts={["추후 개발 예정입니다"]}/>
        <NoticeBox
          icon={<Icon icon="bi:bookmark-fill" color="#BF4A4A"/>}
          title="할 일"
          posts={["추후 개발 예정입니다"]}/>
      </div>
      <div className={`${styles.socialIcons}`}>
          <SocialIcon url="https://www.instagram.com/npcddwu/" />
          <SocialIcon url="https://www.youtube.com/@npcddwu" />
      </div>
    </div>
  );
};