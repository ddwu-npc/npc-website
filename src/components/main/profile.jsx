import { Link, useLoaderData } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";

import styles from "./style.module.scss";
import { readUserFile, getUserno } from "api/user"; 

export default () => {
    const { user } = useLoaderData();    
    const [attachment, setAttachment] = useState([]);

    useEffect(() => {
        const fetchAttachment = async () => {
          try {
            const userno = await getUserno();
            const result = await readUserFile(userno); 
            setAttachment(result);
          } catch (error) {
            console.error("Error fetching user file:", error);
          }
        };
      
        fetchAttachment();
      }, []);


    return (
        <div className={`${styles.box} ${styles.profile}`}>
            <div className={styles.link}>
                <Link to="/mypage">마이페이지 <Icon icon="icon-park-outline:right" color="#B1B1B1"/></Link>
            </div>
            {attachment && attachment.sName ? (
            <img src={`/userfile/look/${attachment.sName}`} />
            ) : (
              <img src={`/userfile/look/default.png`} />
            )}
            <div className={styles.content}>
                <div><Icon icon="charm:person" /> 닉네임: {user.nickname}</div>
                <div><Icon icon="carbon:condition-point" /> NPC Point: {user.npcPoint}</div>
                <div><Icon icon="fluent:people-team-28-regular" /> 소속: {user.dname}</div>
            </div>
        </div>
    );
}