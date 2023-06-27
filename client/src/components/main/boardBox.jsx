import { Icon } from "@iconify/react";
import styles from "./style.module.scss";

export default ({icon, title, posts}) => {
    return (
        <div className={`${styles.box} ${styles.boardBox}`}>
            <div className={styles.header}>
                <div>{icon}{title}</div>
                <Icon icon="icon-park-outline:right" color="#B1B1B1"/>
            </div>
            <div className={styles.content}>
                {posts.slice(0, 5).map((post, idx) => (
                    <li key={`boardBox_${title}_${idx}`}>{post}</li>
                ))}
            </div>
        </div>
    );
};