import { Link, useLoaderData } from "react-router-dom";
import { Icon } from "@iconify/react";

import styles from "./style.module.scss";

export default () => {
    const { user } = useLoaderData();

    return (
        <div className={`${styles.box} ${styles.profile}`}>
            <div className={styles.link}>
                <Link to="/mypage">마이페이지 <Icon icon="icon-park-outline:right" color="#B1B1B1"/></Link>
            </div>
            <img src={user.profile} />
            <div className={styles.content}>
                <div><Icon icon="charm:person" /> 닉네임: {user.nickname}</div>
                <div><Icon icon="carbon:condition-point" /> NPC Point: {user.npcPoint}</div>
                <div><Icon icon="fluent:people-team-28-regular" /> 소속: {user.dname}</div>
            </div>
        </div>
    );
}