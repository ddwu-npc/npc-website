import { Link } from "react-router-dom";
import { Icon } from '@iconify/react';

import styles from "./style.module.scss";

export default () => {


  return (
    <div className={styles.setting}>
      <div className={styles.header}><Icon icon="uil:setting" /> 설정</div>
        <Link to={`/mypage/changePassword`}>    
          <div className={styles.link}>비밀번호 변경하기</div></Link>
        <Link to={`/mypage/deleteAccount`}>    
          <div className={styles.link}>회원 탈퇴하기</div></Link>
    </div>
  )
}