import axios from "./axios";

export const getAttendanceInfo = (attendanceId) => {
    return axios.get(`/attendance/${attendanceId}`);
};

export const attend = (attendanceId, authcode, token) => {
    return axios.getWithHeader(`/attendance/${attendanceId}/${authcode}`, token);
}

export const createAttendance = (pid) => {
    return axios.get(`/attendance/create/${pid}`);
};

export const getMyAttendance = () => {
    return new Promise((resolve) =>
        setTimeout(() => {
            resolve([1, 2, 3]); // 내가 속한 프로젝트에서 오늘 출석 중인 출석들
        }
    ));
};