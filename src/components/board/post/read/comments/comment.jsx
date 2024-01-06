import styles from "./style.module.scss";
import { useState, useEffect } from "react";

import Option from "./option";
import { readUserFile } from "api/user"; 

export default ({ comment }) => {
  const [attachment, setAttachment] = useState([]);
  useEffect(() => {
    if(comment.user.profile==1){
      const fetchAttachment = async () => {
        try {
          const userno = comment.user.userNo;
          const result = await readUserFile(userno); 
          setAttachment(result);
        } catch (error) {
          console.error("Error fetching user file:", error);
        }
      };
      fetchAttachment();
    }
  }, []);
  
  return (
    <>
      <div className={styles.comment}>
        <Option commentId={comment.commentId}/>
        {attachment && comment.user.profile==1 ? (
            <img src={`/userfile/look/${attachment.sName}`} />
            ) : (
              <img src={`/userfile/look/default.png`} />
        )}
        <div>
          <div className={styles.info}>
            <span className={styles.writer}>{comment.user.nickname}</span>
            <span className={styles.date}>{comment.create_date}</span>
          </div>
          <div className={styles.content}>{comment.content}</div>
          <div className={styles.attachment}>
            <div></div>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};
