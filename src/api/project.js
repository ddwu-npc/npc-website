import axios from "./axios";

// 프로젝트 - 출석 DB 어떻게 작성할 건지, 어떻게 구현되는지 정리해서 전달주시면 맞춰서 수정할 예정

// 추가로 필요한 것
// project team 정보는 어떻게?
// 1. user의 point 얻고 잃었던 기록 [{날짜, 내용, 변경된 포인트(+4 / -4), 합계}, ...]

export const getProjectList = (search, page) => {
  // search
  // type: 0 전체, 1 팀 2 개인
  // process: 0 전체, 1 개발중, 2 개발완료
  const url = '/project?page=' + page;
  return axios.get(url);
};

export const getProjectInfo = (pid) => {
  return axios.get(`/project/${pid}`);
};

export const getQuickAttendance = (pid) => {
  return axios.get(`/attendance/quick/${pid}`);
};

export const createProject = (project) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(true); // project에서 현재 생성되어 있는 출석의 id를 가져옴
    }, 100)
  );
};

export const updateProject = (project) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(true); // project에서 현재 생성되어 있는 출석의 id를 가져옴
    }, 100)
  );
};

export const deleteProject = (pid) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(true);
    }, 100)
  );
};
