import { Outlet } from "react-router-dom";

import Login from "./login";
import Signup from "./signup";

import styles from "./style.module.scss";

const Account = () => {
  return (
    <div className={styles.account}>
      <Outlet />
    </div>
  );
};

export default {
  element: <Account />,
  children: [
    {
      path: "",
      element: <Login />,
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "signup",
      element: <Signup />,
    },
  ],
};
