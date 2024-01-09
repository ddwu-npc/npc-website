import { useState, useEffect } from "react";
import { redirect, useLoaderData } from "react-router";
import { Link } from "react-router-dom";

import { getUserno, readUserInfo, readUserFile, updateUserInfo, vaildateNickname } from "api/user"; 

import styles from "./style.module.scss";
import { Icon } from '@iconify/react';

export default () => {
  const { user } = useLoaderData();
  const [edit, setEdit] = useState(false);
  const [newNickname, setNewNickname] = useState(user.nickname);
  const [newEmail, setNewEmail] = useState(user.email);
  const [newBirthday, setNewBirthday] = useState(user.birthday);
  const [newDname, setNewDname] = useState(user.dname);
  const [newProfile, setNewProfile] = useState(user.profile);
  const [newProfileView, setNewProfileView] = useState(null);
  const [attachment, setAttachment] = useState([]);

  const findUserno = async () => {
    try {
      const userId = await getUserno();
      return userId;
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  useEffect(() => {
    const fetchAttachment = async () => {
      try {
        const userId = await findUserno(); 
        const result = await readUserFile(userId); 
        setAttachment(result);
      } catch (error) {
        console.error("Error fetching user file:", error);
      }
    };
  
    fetchAttachment();
  }, []);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0]; 
    if (file) {
      setNewProfile(file); 
      setAttachment(null);
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
      const oldUserInfo = await readUserInfo(userId);
      

      if (oldUserInfo.nickname != newNickname){
        if(!(await vaildateNickname(newNickname))){
          alert("이미 존재하는 닉네임입니다.");
          return; 
        }
      }

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
            <div>
              {(newProfileView && !attachment) ? (
                <img src={newProfileView} alt="New Profile" />
              ) : (
                attachment && attachment.sName ? (
                  <img src={`/userfile/look/${attachment.sName}`}/>
                ) : (
                  <img src={`/userfile/look/default.png`}/>
                )
              )}
            </div>
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
                  <option value="DEVELOPER">개발팀</option>
                  <option value="PLAN">기획팀</option>
                  <option value="DESIGN">디자인팀</option>
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
            {attachment && attachment.sName ? (
              <div className={styles.imgContainer}>
                <img src={`/userfile/look/${attachment.sName}`} />
              </div>
            ) : (
              <div className={styles.imgContainer}>
              <img src={`/userfile/look/default.png`} />
              </div>
            )}
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
                <label>NPC Point
                  <Link to={"point"}>
                  내역 보기 <Icon icon="ps:right" /></Link>
                </label>
                <div>{user.npcPoint}
                </div>
              </div>
              <div className={styles.infoData}>
                <label>소속</label>
                <div>
                  {user.dname === 'DEVELOPER' ? `개발팀 ` : ``}
                  {user.dname === 'DESIGN' ? `디자인팀 ` : ``}
                  {user.dname === 'PLAN' ? `기획팀 ` : ``}
                  </div>
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
