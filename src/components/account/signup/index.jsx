import { useRef, useState } from "react";
import { Link, redirect } from "react-router-dom";
import {
  signup,
  vaildateNickname,
  vaildateLoginId,
  vaildateEmail,
} from "api/user";

import logo from "components/commons/img/logo.png";

import styles from "./style.module.scss";

export default () => {
  const formRef = useRef();

  const [nicknameErr, setNicknameErr] = useState(null);
  const [loginIdErr, setLoginIdErr] = useState(null);
  const [passwordErr, setPasswordErr] = useState(null);
  const [passwordComfirmErr, setPasswordComfirmErr] = useState(null);
  const [emailErr, setEmailErr] = useState(null);

  const submit = async () => {
    if (
      nicknameErr ||
      loginIdErr ||
      passwordErr ||
      passwordComfirmErr ||
      emailErr
    )
      return;

    const form = formRef.current;
    const nickname = form.nickname.value;
    const loginId = form.loginId.value;
    const password = form.password.value;
    const passwordComfirm = form.passwordComfirm.value;
    const email = form.email.value;

    if (
      nickname.length === 0 ||
      loginId.length === 0 ||
      password.length === 0 ||
      passwordComfirm.length === 0 ||
      email.length === 0
    )
      return;

    if ((await signup(loginId, password, nickname, email))) {
      alert("회원가입 실패");
    } else {
      alert("회원가입 성공");
      window.location.href = "/account";
    }
  };

  const vaildNickname = async () => {
    const form = formRef.current;

    if (await vaildateNickname(form.nickname.value)) setNicknameErr(null);
    else setNicknameErr("중복된 닉네임입니다.");
  };
  const vaildId = async () => {
    const form = formRef.current;

    if (await vaildateLoginId(form.loginId.value)) setLoginIdErr(null);
    else setLoginIdErr("중복된 ID입니다.");
  };
  const vaildEmail = async () => {
    const form = formRef.current;

    if (form.email.value.indexOf("@") === -1)
      setEmailErr("유효하지 않은 이메일입니다.");
    else if (await vaildateEmail(form.email.value)) setEmailErr(null);
    else setEmailErr("중복된 이메일입니다.");
  };
  const comfirmPW = () => {
    const form = formRef.current;

    if (form.password.value.length < 8) {
      setPasswordErr("비밀번호가 너무 짧습니다.");
      setPasswordComfirmErr(null);
      return;
    } else {
      setPasswordErr(null);
    }

    if (form.password.value != form.passwordComfirm.value) {
      setPasswordComfirmErr("비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordComfirmErr(null);
    }
  };

  return (
    <form className={styles.signup} ref={formRef}>
      <img src={logo} />
      <div className={styles.title}>회원 가입</div>
      <div className={styles.warning}>{nicknameErr}</div>
      <input
        className={nicknameErr != null && styles.error}
        type="text"
        name="nickname"
        placeholder="닉네임"
        onChange={vaildNickname}
      />
      <div className={styles.warning}>{loginIdErr}</div>
      <input
        className={loginIdErr != null && styles.error}
        type="text"
        name="loginId"
        placeholder="아이디"
        onChange={vaildId}
      />
      <div className={styles.warning}>{passwordErr}</div>
      <input
        className={passwordErr != null && styles.error}
        type="password"
        name="password"
        placeholder="비밀번호"
        onChange={comfirmPW}
      />
      <div className={styles.warning}>{passwordComfirmErr}</div>
      <input
        className={passwordComfirmErr != null && styles.error}
        type="password"
        name="passwordComfirm"
        placeholder="비밀번호 확인"
        onChange={comfirmPW}
      />
      <div className={styles.warning}>{emailErr}</div>
      <input
        className={emailErr != null && styles.error}
        type="text"
        name="email"
        placeholder="이메일"
        onChange={vaildEmail}
      />
      <div className={styles.terms}>
        <input id="terms" type="checkbox" />
        <label htmlFor="terms">이용 약관에 동의합니다.</label>
      </div>
      <input type="button" value="입력 완료" onClick={submit} />
    </form>
  );
};
