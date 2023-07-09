import { createBrowserRouter } from "react-router-dom";

import accountRouter from "components/account";

import Root, { loader as rootLoader } from "components/root";

import Main, { loader as mainLoader } from "components/main";
import Board, { loader as boardLoader, postRouter } from "components/board";
import Project, { 
  loader as projectLoader,
  viewRouter as projectViewRouter,
  editRouter as projectEditRouter } from "components/project";
import Attendance, { loader as attendanceLoader } from "components/attendance";

import Calendar, { loader as calendarLoader } from "components/calendar";
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
        path: "/project/:pid",
        ...projectViewRouter 
      },
      {
        path: "/project/:pid/edit",
        ...projectEditRouter,
      },
      {
        path: "/project/create",
        ...projectEditRouter,
      },
      {
        path: "/calendar",
        element: <Calendar />,
        loader: calendarLoader,
      },
      {
        path: "/mypage",
        element: <Mypage />,
        loader: MypageLoader,
      },
      {
        path: "/attendance/:attendanceId",
        element: <Attendance/>,
        loader: attendanceLoader
      }
    ],
  },
]);
