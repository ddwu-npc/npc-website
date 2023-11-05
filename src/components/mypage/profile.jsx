import { useState } from "react";
import { useLoaderData } from "react-router";

import styles from "./style.module.scss";

export default () => {
  const { user } = useLoaderData();
  const [edit, setEdit] = useState(false);

  return (
    <div className={styles.profile}>
      <div>
        <div className={styles.title}>프로필</div>
        <div className={styles.edit} onClick={() => setEdit(!edit)}>
          {edit ? "완료" : "수정"}
        </div>
      </div>
      <hr />
      <div>
        <img src={user.profile} />
        {edit ? (
          <>
            <div className={styles.info}>
              <div className={styles.infoData}>
                <label>닉네임</label>
                <input defaultValue={user.nickname}></input>
              </div>
              <div className={styles.infoData}>
                <label>이메일</label>
                <input defaultValue={user.email}></input>
              </div>
              <div className={styles.infoData}>
                <label>생일</label>
                <input defaultValue={user.birthday}></input>
              </div>
              <div className={styles.infoData}>
                <label>NPC Point</label>
                <input value={user.npc_point}></input>
              </div>
              <div className={styles.infoData}>
                <label>소속</label>
                <input value={user.rank}></input>
              </div>
              <div className={styles.infoData}>
                <label>참여 중인 프로젝트</label>
                <input></input>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={styles.info}>
              <div className={styles.infoData}>
                <label>닉네임</label>
                <div>{user.nickname}</div>
              </div>
              <div className={styles.infoData}>
                <label>이메일</label>
                <div>{user.email}</div>
              </div>
              <div className={styles.infoData}>
                <label>생일</label>
                <div>{user.birthday}</div>
              </div>
              <div className={styles.infoData}>
                <label>NPC Point</label>
                <div>{user.npc_point}</div>
              </div>
              <div className={styles.infoData}>
                <label>소속</label>
                <div>{user.rank}</div>
              </div>
              <div className={styles.infoData}>
                <label>참여 중인 프로젝트</label>
                <div></div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
