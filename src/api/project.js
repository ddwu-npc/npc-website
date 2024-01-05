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

export const getNewProjectInfo = (userno) => {
  return axios.get(`/project/create/${userno}`);
};

export const createProject = (project) => {
  return axios.put(`/project/create/${project.projectRes.pid}`, project.projectRes, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      return true; 
    })
    .catch((error) => {
      console.error('There was a problem with the Axios request:', error);
      throw error;
    });
};

export const updateProject = (project) => {
  return axios.put(`/project/${project.projectRes.pid}`, project.projectRes, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      return true; 
    })
    .catch((error) => {
      console.error('There was a problem with the Axios request:', error);
      throw error;
    });
};

export const deleteProject = (pid) => {
  return new Promise((resolve, reject) => {
    fetch(`/project/${pid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error deleting project');
        }
        resolve(true); 
      })
      .catch((error) => {
        reject(error); 
      });
  });
};
