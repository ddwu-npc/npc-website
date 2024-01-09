import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

import styles from "./style.module.scss";

import { getQuickAttendance } from "api/project";

export default ({icon}) => {
    const navigate = useNavigate();

    const handleQuickAttendance = async () => {
        const quickAttendanceId = await getQuickAttendance(1000);
        if (quickAttendanceId === -100) {
            alert("현재 열린 출석이 없습니다.");
        } else {
            navigate(`/attendance/${quickAttendanceId}`);
        }
    };

    return (
        <div className={`${styles.box} ${styles.attendanceBox}`}>
            <div className={styles.header} onClick={handleQuickAttendance}>
                <div>{icon}정기 회의 출석</div>
            </div>
        </div>
    );
};