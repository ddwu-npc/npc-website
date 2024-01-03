import { useState, useEffect } from "react";
import { redirect, useLoaderData, useNavigate, useNavigationType } from "react-router-dom";

import { getAttendanceInfo, attend } from "api/attendance";
import { getToken } from "api/jwtToken";
import styles from "./style.module.scss";
import Header from "components/commons/header";

import { usePos } from "hooks";

export const loader = async ({ params }) => {
    const attendanceId = params.attendanceId;
    return await getAttendanceInfo(attendanceId);
}

export default () => {
    usePos("출석");
    
    const navigate = useNavigate();
    const navigationType = useNavigationType();

    const attendance = useLoaderData();
    const token = `Bearer ${getToken()}`

    const [err, setErr] = useState(false);
    const [authCode, setAuthCode] = useState("");
    const [timeRemaining, setTimeRemaining] = useState(0);

    useEffect(() => {
        const calculateEndTime = () => {
            const attendanceDateTime = new Date(attendance.attendanceDate).getTime();
            const endTime = attendanceDateTime + 1 * 60 * 1000; // 1분
            return endTime;
        };

        const updateTimer = () => {
            const endTime = calculateEndTime();
            const now = new Date().getTime();
            const remaining = Math.max(0, endTime - now); 

            setTimeRemaining(remaining);

            if (remaining === 0) {
                navigate(-1);
            }
        };
        const timer = setInterval(updateTimer, 1000); // 1초마다 updateTimer 실행
        updateTimer(); // 최초 실행

        return () => clearInterval(timer); // 컴포넌트 언마운트 시 타이머 정리
    }, [attendance.attendanceDate]); 

    const formatTime = (ms) => {
        const minutes = Math.floor(ms / (1000 * 60));
        const seconds = Math.floor((ms % (1000 * 60)) / 1000);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className={styles.root}>
            <Header text="출석" src="/"></Header>
            <div className={styles.content}>
                <div className={styles.title}>{attendance.meeting}</div>
                {timeRemaining > 0 && (<div className={styles.timer}>
                    남은 시간: {formatTime(timeRemaining)}
                </div>)}
                <div className={styles.authCode}>
                    {err && <div className={styles.error}>출석 번호가 일치하지 않습니다</div>}
                    <input type="text" placeholder="출석 번호 입력" defaultValue={authCode} 
                        onChange={(e) => setAuthCode(e.target.value)}/>
                    <input type="button" value="출석" 
                        onClick={async () => {
                            if (await attend(attendance.attendanceId, authCode, token)) {
                                alert(`${attendance.meeting} 출석에 성공했습니다.\n10 포인트가 적립되었습니다.`);
                                if(navigationType === "PUSH") navigate(-1);
                                else navigate("/");
                            }
                            else {
                                setErr(true);
                            }
                        }}
                    />
                </div>
            </div>
        </div> 
    );
}