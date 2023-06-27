import { useLoaderData, Link } from "react-router-dom";
import { logout } from "api/user";
import styles from "./style.module.scss";

import Smile from "./smile";

export default () => {
  const { user } = useLoaderData();

  return (
    <div className={styles.hello}>
      <Link to="/mypage">
        어서오세요, {user.nickname} 님.
        <Smile />
      </Link>
      <Link to="/account" onClick={async () => logout()}>
        로그아웃
      </Link>
    </div>
  );
};
