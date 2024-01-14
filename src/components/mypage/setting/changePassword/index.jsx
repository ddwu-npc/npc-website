import { useRef, useState } from "react";
import { Link, useNavigate, useNavigationType } from "react-router-dom";

import { changePassword } from "api/user";

import styles from "./style.module.scss";

export const loader = async ({ params }) => {
    return params;
}

export default () => {
    const navigate = useNavigate();
    const navigationType = useNavigationType();
  
    const formRef = useRef();
    const [fail, setFail] = useState(false);
    const [passwordErr, setPasswordErr] = useState("비밀번호를 입력하세요.");

    const submit = async () => {
      const form = formRef.current;
      const password =  form.password.value;
      const result = await changePassword(password);

      if (passwordErr) return;
      if (password.length === 0) return;
      if (result) {
        alert("비밀번호가 변경되었습니다");
        navigate(-1);
      } else {
        setFail(true);}
    };
  
    const comfirmPW = () => {
        const form = formRef.current;

        if (!form.password.value) setPasswordErr("변경할 비밀번호를 입력하세요.");
        if (form.password.value.length < 8) {
          setPasswordErr("비밀번호가 너무 짧습니다.");
          return;
        } else {
          setPasswordErr(null);
        }
    };

    const handleClick = () => {
      submit();
    };
  
    return (
      <form className={styles.changepassword} ref={formRef} onSubmit={(e) => e.preventDefault()}>
        <p className={fail && styles.fail}>
          {fail && "비밀번호 변경에 실패했습니다"}
        </p>
        <div className={styles.warning}>{passwordErr}</div>
        <div className={fail && styles.fail}>
          <label>새로운 비밀번호</label>
          <input
            className={passwordErr != null && styles.error}
            name="password"
            type="password"
            placeholder="변경할 비밀번호를 입력하세요"
            onChange={comfirmPW}
          />
        </div>
        <input type="button" value="비밀번호 변경" onClick={handleClick} />
      </form>
    );
};