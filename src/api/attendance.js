export const getAttendanceInfo = (attendanceId) => {
    return new Promise((resolve) =>
        setTimeout(() => {
            resolve({
                attendanceId: 1,
                userNo: 1,
                type: "", // 어떤 값?
                attendanceDate: "2023-07-07",
                meeting: "[회의 명]" // 회의 명?
            });
        }
    ));
};

export const attend = (attendanceId, authcode) => {
    return new Promise((resolve) =>
        setTimeout(() => {
            if(authcode==="123") resolve(true);
            else resolve(false);
        }
    ));
}

export const createAttendance = (pid) => {
    return new Promise((resolve) =>
        setTimeout(() => {
            resolve(1); // 생성한 attendance Id
        }
    ));
};

export const getMyAttendance = () => {
    return new Promise((resolve) =>
        setTimeout(() => {
            resolve([1, 2, 3]); // 내가 속한 프로젝트에서 오늘 출석 중인 출석들
        }
    ));
};