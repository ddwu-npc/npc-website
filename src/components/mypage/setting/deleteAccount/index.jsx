import { useRef, useState } from "react";
import { Link, useNavigate, useNavigationType } from "react-router-dom";

import { changePassword } from "api/user";

import styles from "./style.module.scss";

export const loader = async ({ params }) => {
    return params;
}

export default () => {

    return (
        <div className={styles.temp}>추후 개발 예정입니다<br></br>
        동아리 탈퇴는 김민정 부원께 연락주시길 바랍니다<br></br>
        010-4787-5426</div>
    );
};