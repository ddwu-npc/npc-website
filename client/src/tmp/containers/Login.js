import React, { Component } from "react";
import { Link } from "react-router-dom";

import styles from "../css/Login.module.css";

import { login } from "../../actions/user";

class Login extends Component {
  constructor(props) {
    super();

    this.state = {
      result: "아직 로그인 시도 안함",
    };
  }

  onSubmit = () => {
    const form = document.getElementById("Login");
    const loginId = form.querySelector("input[name='id']").value;
    const password = form.querySelector("input[name='pw']").value;

    if (login(loginId, password)) {
      this.setState({ result: "로그인 성공" });
    } else {
      this.setState({ result: "로그인 실패" });
    }
  };

  render() {
    return (
      <div className={styles.bg}>
        <div className={styles.container}>
          <div className={styles.result}>{this.state.result}</div>
          <Link className={styles.signup} to={"/signup"}>
            {"회원가입하기 >"}
          </Link>
          <img className={styles.logo} src="/Header/npc.png"></img>

          <form id="Login" onSubmit={() => false}>
            <div className={styles.inputDiv}>
              <label>ID</label>
              <input
                type="text"
                name="id"
                placeholder="아이디를 입력하세요"
              ></input>
            </div>
            <div className={styles.inputDiv}>
              <label>PW</label>
              <input
                type="password"
                name="pw"
                placeholder="비밀번호를 입력하세요"
              ></input>
            </div>
            <input type="button" value="login" onClick={this.onSubmit}></input>
            <div className={styles.find}>아이디 또는 비밀번호 찾기</div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
