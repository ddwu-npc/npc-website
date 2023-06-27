import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { login } from "api/user";

import logo from "components/commons/img/logo.png";

import styles from "./style.module.scss";
import { Icon } from "@iconify/react";

export default () => {
  const formRef = useRef();
  const [fail, setFail] = useState(false);

  const submit = async () => {
    const form = formRef.current;

    const result = await login(form.loginId.value, form.password.value);
    if (result) {
      window.location.href = "/";
    } else setFail(true);
  };

  return (
    <form className={styles.login} ref={formRef}>
      <Link to={"signup"}>
        회원가입하기 <Icon icon="ps:right" />
      </Link>
      <img src={logo} />
      <p className={fail && styles.fail}>
        {fail && "아이디 또는 비밀번호가 맞지 않습니다"}
      </p>
      <div className={fail && styles.fail}>
        <label>ID</label>
        <input name="loginId" type="text" placeholder="아이디를 입력하세요" />
      </div>
      <div className={fail && styles.fail}>
        <label>PW</label>
        <input
          name="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
        />
      </div>
      <input type="button" value="login" onClick={submit} />
    </form>
  );
};
