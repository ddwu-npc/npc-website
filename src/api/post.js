import axios from "./axios";
import ex_axios from "axios";
import { getToken } from "./jwtToken";

export const readPost = (post_id) => {
  return axios.getWithHeader(`/post/${post_id}`);
};

export const createPost = (boardId, fData, token) => {
  const uri = '/post/' + boardId;

  const postData = Object.fromEntries(fData);
  const formData = new FormData();

  formData.append('title', postData.title);
  formData.append('content', postData.content);
  formData.append('rangePost', postData.rangePost);
  formData.append('important', postData.important);

  const attachmentFiles = fData.getAll("attachment");
  
  attachmentFiles.forEach((file, index) => {
    if(file.size>0)
      formData.append(`attachment_${index}`, file);
  });
  
  return ex_axios({
    method: 'post',
    url: uri,
    data: formData,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data', // Content-Type 설정
    },
  });
};

export const updatePost = (post_id, fData) => {
  const postData = Object.fromEntries(fData);
  const formData = new FormData();

  formData.append('title', postData.title);
  formData.append('content', postData.content);
  formData.append('rangePost', postData.rangePost);
  formData.append('important', postData.important);

  const attachmentFiles = fData.getAll("attachment");
  
  attachmentFiles.forEach((file, index) => {
    if(file.size>0)
      formData.append(`attachment_${index}`, file);
  });

  return ex_axios({
    method: 'put',
    url: `/post/${post_id}`,
    data: formData,
  });
};

export const deletePost = async(post_id) => {
  const bId = await getBoardIdByPostId(post_id);
  return axios.delete(`/post/${post_id}`, "post", bId);
};

//post 삭제 시 해당 post의 게시판으로 돌아가야 함
export const getBoardIdByPostId = async (post_id) => {
  return axios.get(`/post/findBoard/${post_id}`);
};

export const findAuthor = (id, type)=>{
  if(type=="comment"){
    return axios.get(`/comment/find/${id}`);
  }else if(type=="post"){
    return axios.get(`/post/find/${id}`);
  }
}

export const readFile = async (post_id) => {
  return axios.get(`/files/${post_id}`);
};

export const downloadFile =(file)=>{
  const backendEndpoint = '/files/download/';
  const fileName = file.sName;
  const downloadUrl = `${backendEndpoint}/${fileName}`;
  
  const xhr = new XMLHttpRequest();
  xhr.open('GET', downloadUrl, true);
  xhr.responseType = 'blob';

  xhr.onload = function () {
    // Create a blob from the response
    const blob = new Blob([xhr.response], { type: 'application/octet-stream' });

    // Create a link element and trigger a click to initiate the download
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();

    // Clean up
    window.URL.revokeObjectURL(link.href);
  };
  
  xhr.send();
}

export const createComment = (post_id, commentData, token) => {
  return axios.postWithHeader(`/comment/${post_id}`, commentData, token);
};

export const readComment = (post_id) => {
  return axios.getWithHeader(`/comment/${post_id}`);
};

export const deleteComment = (comment_id) => {
  return axios.delete(`/comment/${comment_id}`,"comment");
};

// 유저가 생성한 comment들 리스트 받아와야 함. (mypage 용)
export const getCommentListByUserId = (userno) => {
  return axios.post(`/mypage/comment/${userno}`)
    .then(response => {
      return {count: response.length, preview: response} || { count: 0, preview: [] }; 
    })
    .catch(error => {
      console.error('Error fetching user comments:', error);
      return { count: 0, preview: [] }; 
    });
};