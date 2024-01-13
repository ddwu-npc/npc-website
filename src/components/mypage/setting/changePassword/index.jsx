import { useRef, useState } from "react";
import { Link, useNavigate, useNavigationType } from "react-router-dom";

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
    const [passwordComfirmErr, setPasswordComfirmErr] = useState(null);

    const submit = async () => {
      const form = formRef.current;
      const password =  form.password.value;

    // 토큰 받아오기
    //const result = await changepassword(password, token);
    //if (result) {
    //       alert("비밀번호가 변경되었습니다");
    //       navigate(-1);
    //   } else {
    //     setFail(true);
    //   }
   // };
    };
  
    const comfirmPW = () => {
        const form = formRef.current;

        if (!form.password.value) setPasswordErr("비밀번호를 입력하세요.");
        if (form.password.value.length < 8) {
            setPasswordErr("비밀번호가 너무 짧습니다.");
            setPasswordComfirmErr(null);
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
          {fail && "일치하는 회원이 없습니다"}
        </p>
        <div className={fail && styles.fail}>
          <label>새로운 비밀번호</label>
          <input
            name="password"
            type="password"
            placeholder="변경할 비밀번호를 입력하세요"
          />
        </div>
        <input type="button" value="비밀번호 변경" onClick={handleClick} />
      </form>
    );
};