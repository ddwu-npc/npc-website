import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import styles from "./style.module.scss";

export default ({icon, boardData}) => {
    const { board_id, bName, postPaging } = boardData;
    const postList = postPaging.postList;
    return (
        <div className={`${styles.box} ${styles.boardBox}`}>
            <div className={styles.header}>
                <div>{icon}{bName}</div>
                <Icon icon="icon-park-outline:right" color="#B1B1B1"/>
            </div>
            <div className={styles.content}>
                {postList.slice(0, 5).map((post, idx) => (
                    <li key={`boardBox_${bName}_${idx}`}><Link to={`/board/${board_id}/post/${post.postId}`}>{post.title}</Link></li>
                ))}
            </div>
        </div>
    );
};