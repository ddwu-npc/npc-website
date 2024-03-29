import { useRef, useState } from "react";
import { Link, useNavigate, useNavigationType } from "react-router-dom";
import { login } from "api/user";

import logo from "components/commons/img/logo.png";

import styles from "./style.module.scss";
import { Icon } from "@iconify/react";

export default () => {
  const navigate = useNavigate();
  const navigationType = useNavigationType();

  const formRef = useRef();
  const [fail, setFail] = useState(false);

  const submit = async () => {
    const form = formRef.current;
    const data = {
      loginId: form.loginId.value,
      password: form.password.value
    };

    const result = await login(data.loginId, data.password);

    if (result) {
      if (navigationType === "PUSH") navigate(-1);
      else navigate("/");
    } else {
      setFail(true);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      submit();
    }
  };

  const handleClick = () => {
    submit();
  };

  return (
    <form className={styles.login} ref={formRef} onSubmit={(e) => e.preventDefault()}>
      <Link className={`${styles.signup}`} to={"signup"}>
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
          onKeyDown={handleKeyDown}
        />
      </div>
      <input type="button" value="로그인" onClick={handleClick} />
      <Link className={`${styles.forgetPassword}`} to={"forgetPassword"}>비밀번호를 잊으셨나요?</Link>
    </form>
  );
};
