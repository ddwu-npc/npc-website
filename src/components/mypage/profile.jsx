import { useState } from "react";
import { useLoaderData } from "react-router";
import { updateUserInfo } from "api/user"; 

import styles from "./style.module.scss";

export default () => {
  const { user } = useLoaderData();
  const [edit, setEdit] = useState(false);
  const [newNickname, setNewNickname] = useState(user.nickname);
  const [newEmail, setNewEmail] = useState(user.email);
  const [newBirthday, setNewBirthday] = useState(user.birthday);

  const handleSave = async () => {
    try {
      await updateUserInfo({
        nickname: newNickname,
        email: newEmail,
        birthday: newBirthday,
      });    

      setEdit(false);
      window.location.reload();
      
    } catch (error) {
      console.error("Error updating user info:", error);
    }
  };

  return (
    <div className={styles.profile}>
      <div>
        <div className={styles.title}>프로필</div>
        <div className={styles.edit} onClick={() => {
          if (edit) {
            handleSave(); 
          } 
          else {
            setEdit(!edit); 
          }
        }}>
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
                <input defaultValue={user.nickname} onChange={(e) => setNewNickname(e.target.value)}></input>
              </div>
              <div className={styles.infoData}>
                <label>이메일</label>
                <input defaultValue={user.email} onChange={(e) => setNewEmail(e.target.value)}></input>
              </div>
              <div className={styles.infoData}>
                <label>생일</label>
                <input defaultValue={user.birthday} onChange={(e) => setNewBirthday(e.target.value)}></input>
              </div>
              <div className={styles.infoData}>
                <label>NPC Point</label>
                <input value={user.npcPoint}></input>
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
                <div>{user.npcPoint}</div>
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
