import axios from "./axios";

export const getAttendanceInfo = (attendanceId) => {
    return axios.getWithHeader(`/attendance/${attendanceId}`);
};

export const attend = (attendanceId, authcode) => {
    return axios.getWithHeader(`/attendance/${attendanceId}/${authcode}`);
}

export const createAttendance = (pid) => {
    return axios.get(`/attendance/create/${pid}`);
};

/* 사용하지 않아 주석 처리
export const getMyAttendance = () => {
    return new Promise((resolve) =>
        setTimeout(() => {
            resolve([1, 2, 3]); // 내가 속한 프로젝트에서 오늘 출석 중인 출석들
        }
    ));
};
*/