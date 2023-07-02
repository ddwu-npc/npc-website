import { createBrowserRouter } from "react-router-dom";

import accountRouter from "components/account";

import Root, { loader as rootLoader } from "components/root";

import Main, { loader as mainLoader } from "components/main";
import Board, { loader as boardLoader } from "components/board";
import postRouter from "components/post";
import Project, { loader as projectLoader} from "components/project";
import Calendar from "components/calendar";
import Mypage, { loader as MypageLoader } from "components/mypage";

import ErrorPage from "./error-page";

export default createBrowserRouter([
  {
    path: "/account",
    errorElement: <ErrorPage />,
    ...accountRouter,
  },
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        path: "",
        element: <Main />,
        loader: mainLoader,
      },
      {
        path: "board/:boardId",
        element: <Board />,
        loader: boardLoader,
      },
      {
        path: "board/:boardId/post",
        ...postRouter,
      },
      {
        path: "/project",
        element: <Project />,
        loader: projectLoader,
      },
      {
        path: "/calendar",
        element: <Calendar />,
      },
      {
        path: "/mypage",
        element: <Mypage />,
        loader: MypageLoader,
      },
    ],
  },
]);
