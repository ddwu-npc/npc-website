import { useState, createContext } from "react";
import { Outlet } from "react-router-dom";
import { getUserno, readUserInfo } from "api/user";
import { getBoardList } from "api/board";

import Header from "./header";

export async function loader() {
  const token = await localStorage.getItem('jwtToken');
  const userno = await getUserno();
  const user = await readUserInfo(userno);
  sessionStorage.setItem("nickname", user.nickname);
  const boardList = await getBoardList();
  return { user, boardList };
}

export default function Root() {
  const [pos, setPos] = useState("메인");

  return (
    <>
      <Header pos={pos} />
      <Outlet context={{ setPos }} />
    </>
  );
}