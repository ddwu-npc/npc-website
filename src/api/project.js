import axios from "api/axios";

export const getProjectList = (search, page) => {
  if (search.process == null && search.text == null && search.type == null) {
    return axios.get(`/project?page=${page}`);
  } else {
    return axios.postWithHeaderNoReload(`/project/search?page=${page}`, {
      type: search.type,
      process: search.process,
      text: search.text,
    });}
};

export const getProjectInfo = (pid) => {
  return axios.get(`/project/${pid}`);
};

export const getQuickAttendance = (pid) => {
  return axios.get(`/attendance/quick/${pid}`);
};

// 프로젝트 팀원 추가
export const insertProjectUser = (nickname, pid) => {
  return axios.post(`/project/add/${pid}/${nickname}`);
};

// 프로젝트 팀원 삭제
export const removeProjectUser = (nickname, pid) => {
  return axios.post(`/project/remove/${pid}/${nickname}`);
};

// 프로젝트 리더(팀장) 변경
export const updateProjectLeader = (nickname, pid) => {
  return axios.post(`/project/update/${pid}/${nickname}`);
};

// 사용자가 참여한 프로젝트 모음
export const getProjectsByUser = (userno) => {
  return axios.put(`/project/projectlist/${userno}`);
};

export const createProject = (project) => {
  return axios.putWithHeader('/project/create', project);
};

export const updateProject = (project) => {
  return axios.put(`/project/${project.projectRes.pid}`, project);
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
