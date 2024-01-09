import { useRef, useState } from "react";
import { Link, useNavigate, useNavigationType } from "react-router-dom";

import logo from "components/commons/img/logo.png";

import styles from "./style.module.scss";

export default () => {
  const navigate = useNavigate();
  const navigationType = useNavigationType();

  const formRef = useRef();
  const [fail, setFail] = useState(false);

  const submit = async () => {
    const form = formRef.current;
    const data = {
      loginId: form.loginId.value,
      email: form.email.value
    };

    // api 연결
    const result = false;

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
    <form className={styles.findpassword} ref={formRef} onSubmit={(e) => e.preventDefault()}>
      <img src={logo} />
      <p className={fail && styles.fail}>
        {fail && "일치하는 회원이 없습니다"}
      </p>
      <div className={fail && styles.fail}>
        <label>ID</label>
        <input name="loginId" type="text" placeholder="아이디를 입력하세요" />
      </div>
      <div className={fail && styles.fail}>
        <label>Email</label>
        <input
          name="email"
          type="text"
          placeholder="이메일을 입력하세요"
          onKeyDown={handleKeyDown}
        />
      </div>
      <input type="button" value="본인 확인" onClick={handleClick} />
    </form>
  );
};
