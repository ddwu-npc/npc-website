import { useState, createContext } from "react";
import { Outlet, redirect } from "react-router-dom";
import { getUserno, readUser } from "api/user";
import { getBoardList } from "api/board";

import Header from "./header";

export async function loader() {
  const token = await localStorage.getItem('jwtToken');

  if (!token) {
    console.log(token);
    return redirect("/account");
  }

  const userno = await getUserno();
  const user = await readUser(userno);
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
