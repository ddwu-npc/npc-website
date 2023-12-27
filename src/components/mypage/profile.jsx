import { useState, useEffect } from "react";
import { useLoaderData } from "react-router";
import { readUserFile, updateUserInfo } from "api/user"; 
import { getUserno } from "api/user";

import styles from "./style.module.scss";

export default () => {
  const { user } = useLoaderData();
  const [edit, setEdit] = useState(false);
  const [newNickname, setNewNickname] = useState(user.nickname);
  const [newEmail, setNewEmail] = useState(user.email);
  const [newBirthday, setNewBirthday] = useState(user.birthday);
  const [newDname, setNewDname] = useState(user.dname);
  const [newProfile, setNewProfile] = useState(user.profile);
  const [newProfileView, setNewProfileView] = useState(user.profile);
  
  const findUserno = async () => {
    try {
      const userId = await getUserno();
      return userId;
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0]; 
    if (file) {
      setNewProfile(file); 
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProfileView(reader.result); 
      };
      reader.readAsDataURL(file); 
    }
  };

  const handleSave = async () => {
    try {
      const userId = await findUserno();

      const birthdayCheck = /^\d{4}-\d{2}-\d{2}$/;
      if (!newBirthday.match(birthdayCheck)) {
        alert("생일은 YYYY-MM-DD 형식으로 입력해주세요.");
        return; 
      }

      const formData = new FormData();
      formData.append('userNo', userId);
      formData.append('nickname', newNickname);
      formData.append('email', newEmail);
      formData.append('birthday', newBirthday);
      formData.append('dname', newDname);

      formData.append('profile', newProfile); 

      await updateUserInfo(formData);    

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
        {edit ? (
          <>    
            <div className={styles.imgContainer}>
              <div>{newProfileView ? <img src={newProfileView}/> : <img src={user.profile}/>}</div>
              <div className={styles.editImg}>
                <label htmlFor="img-upload">프로필 변경하기</label>
                <input type="file" name="file" accept="image/*" id="img-upload" onChange={handleFileInputChange} style={{display:"none"}}/>
              </div>
            </div>
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
                <input value={user.npcPoint} readOnly></input>
              </div>
              <div className={styles.infoData}>
                <label>소속</label>
                <select defaultValue={user.dname} onChange={(e) => setNewDname(e.target.value)}>
                  <option value="DEVELOPER">DEVELOPER</option>
                  <option value="PLAN">PLAN</option>
                  <option value="DESIGN">DESIGN</option>
                </select>
                
              </div>
              <div className={styles.infoData}>
                <label>참여 중인 프로젝트</label>
                <input readOnly></input>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={styles.imgContainer}>
              <div><img src={user.profile} /></div>
            </div>
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
                <div>{user.dname}</div>
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
