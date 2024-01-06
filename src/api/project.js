import axios from "./axios";

export const getProjectList = (search, page) => {
  // search
  // type: 0 전체, 1 팀 2 개인
  // process: 0 전체, 1 개발중, 2 개발완료
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

export const getNewProjectInfo = (userno) => {
  return axios.get(`/project/create/${userno}`);
};

export const createProject = (project) => {
  return axios.put(`/project/create/${project.projectRes.pid}`, project, {
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
  return axios.put(`/project/${project.projectRes.pid}`, project, {
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
