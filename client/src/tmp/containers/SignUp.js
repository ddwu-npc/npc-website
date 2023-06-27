import React, { Component } from "react";
import { Link } from "react-router-dom";

import styles from "../css/SignUp.module.css";

import { signup } from "../../actions/user";

class SignUp extends Component {
  constructor(props) {
    super();

    this.state = {
      result: "아직 회원가입 시도 안함",
    };
  }

  onSubmit = () => {
    const form = document.getElementById("SignUp");
    const loginId = form.querySelector("input[name='id']").value;
    const password = form.querySelector("input[name='pw']").value;
    const nickname = form.querySelector("input[name='nickname']").value;
    const email = form.querySelector("input[name='email']").value;

    if (signup(loginId, password, nickname, email)) {
      this.setState({ result: "회원가입 성공" });
    } else {
      this.setState({ result: "회원가입 실패" });
    }
  };

  render() {
    return (
      <div className={styles.bg}>
        <div className={styles.container}>
          <div className={styles.npc}>NPC</div>
          <div className={styles.title}>회원 가입</div>

          <div className={styles.result}>{this.state.result}</div>
          <form id="SignUp" onSubmit={() => false}>
            <input type="text" name="nickname" placeholder="닉네임"></input>
            <input type="text" name="id" placeholder="아이디"></input>
            <input type="password" name="pw" placeholder="비밀번호"></input>
            <input
              type="password"
              name="pw_comfirm"
              placeholder="비밀번호 확인"
            ></input>
            <input type="text" name="email" placeholder="이메일"></input>

            <div className={styles.agree}>이용 약관에 동의합니다.</div>
            <input
              type="button"
              value="입력완료"
              onClick={this.onSubmit}
            ></input>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
