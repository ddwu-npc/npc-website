// 마찬가지로 상황에 맞춰 변경하시고 통보하시면 맞게 수정해서 쓸게요
// + date는 string으로 전달함.
// main 화면에서 할일은 어떻게 할까요

export const getSchedule = (year, month) => {
    return new Promise((resolve) =>
        setTimeout(() => {
            const calendar = {};
            calendar[new Date(`${year}-${month}-03`).toDateString()] = "💛 전체 회의";
            calendar[new Date(`${year}-${month}-10`).toDateString()] = "💛 전체 회의";
            calendar[new Date(`${year}-${month}-17`).toDateString()] = "💛 전체 회의";
            calendar[new Date(`${year}-${month}-24`).toDateString()] = "💛 전체 회의";
            resolve(calendar);
        }, 100)
  );
};

export const getNearSchedule = (date) => { // 앞으로 3주 내에 있는 일정들 return (생일 제외)
    return new Promise((resolve) =>
        setTimeout(() => {
        resolve([
            { 
                date: "2023-05-01",
                content: "전체 회의"
            },
            { 
                date: "2023-05-01",
                content: "전체 회의"
            },
            { 
                date: "2023-05-01",
                content: "전체 회의"
            },
        ]);
    }, 100)
  );
}

export const addSchedule = (schedule) => { // { date, content }
    return new Promise((resolve) =>
        setTimeout(() => {
        resolve(true);
        }, 100)
    );
}