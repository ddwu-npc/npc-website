import { useState, createContext } from "react";
import { Outlet, redirect } from "react-router-dom";
import { getLoginSession, readUser } from "api/user";
import { getBoardList } from "api/board";

import Header from "./header";

export async function loader() {
  const userId = await getLoginSession();

  if (!userId) {
    console.log(userId);
    return redirect("/account");
  }

  const user = await readUser(userId);
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
