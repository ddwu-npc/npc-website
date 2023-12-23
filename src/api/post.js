import axios from "./axios";
import ex_axios from "axios";
import { getToken } from "./jwtToken";

export const readPost = (post_id) => {
  const jwtToken = getToken();
  const token = `Bearer ${jwtToken}` 

  const response = axios.getWithHeader(`/post/${post_id}`, token);

  console.log("read post res", response);

  return axios.getWithHeader(`/post/${post_id}`, token);
};

export const createPost = (boardId, postData) => {
  const jwtToken = getToken(); // localStorage에서 JWT 토큰 가져오기
  const uri = '/post/' + boardId;
  const formData = new FormData();
  if(postData.title != "")
    formData.append('title', postData.title);
  else
  formData.append('title', "제목이 없습니다.");

  formData.append('content', postData.content);
  formData.append('rangePost', postData.rangePost);
  formData.append('important', postData.important);

  if (postData.attachment && postData.attachment.size > 0) {
    formData.append('attachment', postData.attachment);
  }

  return ex_axios({
    method: 'post',
    url: uri,
    data: formData,
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      'Content-Type': 'multipart/form-data', // Content-Type 설정
    },
  });
};

export const updatePost = (post_id, postData) => {
  return axios.put(`/post/${post_id}`, postData);
};

export const deletePost = async(post_id) => {
  const bId = await getBoardIdByPostId(post_id);
  console.log("bId", bId);
  return axios.delete(`/post/${post_id}`, "post", bId);
};

//post 삭제 시 해당 post의 게시판으로 돌아가야 함
export const getBoardIdByPostId = async (post_id) => {
  try {
    const response = await axios.get(`/post/findBoard/${post_id}`);
    console.log("get bId", response);
    return response;
  } catch (error) {
    console.error(`Error while fetching board_id for post_id ${post_id}:`,error);
    throw error;
  }
};

export const findAuthor = (id, type)=>{
  if(type=="comment"){
    const res = axios.get(`/comment/find/${id}`);
    return res;
  }else if(type=="post"){
    const res = axios.get(`/post/find/${id}`);
    return res;
  }
}

export const createComment = (post_id, commentData, token) => {
  console.log("createComment", commentData);
  return axios.postWithHeader(`/comment/${post_id}`, commentData, token);
};

export const readComment = (post_id) => {
  const jwtToken = getToken();
  const token = `Bearer ${jwtToken}` 
  console.log("post token :" + token);
  return axios.getWithHeader(`/comment/${post_id}`, token);
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