import { useState } from "react";
import { useLoaderData, useNavigate, useNavigationType } from "react-router-dom";

import { getAttendanceInfo, attend } from "api/attendance";

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
    const [err, setErr] = useState(false);
    const [authCode, setAuthCode] = useState("");

    return (
        <div className={styles.root}>
            <Header text="출석" src="/"></Header>
            <div className={styles.content}>
                <div className={styles.title}>{attendance.meeting}</div>
                <div className={styles.authCode}>
                    {err && <div className={styles.error}>출석 번호가 일치하지 않습니다</div>}
                    <input type="text" placeholder="출석 번호 입력" defaultValue={authCode} 
                        onChange={(e) => setAuthCode(e.target.value)}/>
                    <input type="button" value="출석" 
                        onClick={async () => {
                            if (await attend(attendance.attendanceId, authCode)) {
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