import { useState } from "react";
import { Outlet } from "react-router-dom";
import { readUser } from "../api/user";
import { getBoardList } from "../api/board";

import Header from "../components/header";

export async function loader() {
  const user = await readUser();
  const boardList = await getBoardList();
  return { user, boardList };
}

export default function Root() {
  const [pos, setPos] = useState("메인");
  return (
    <>
      <Header pos={pos} />
      <Outlet />
    </>
  );
}
