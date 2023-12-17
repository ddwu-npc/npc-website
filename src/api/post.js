import axios from "./axios";
import ex_axios from "axios";

export const readPost = async (post_id) => {
  try {
    const response = await axios.get(`/post/${post_id}`);
    console.log("res",response);
    return response;
  } catch (error) {
    console.error("Error while fetching post:", error);
    throw error; // 에러 처리 가능
  }
};

export const createPost = (boardId, postData) => {
  const jwtToken = localStorage.getItem('jwtToken'); // localStorage에서 JWT 토큰 가져오기
  const uri = '/post/' + boardId;
  console.log(postData);
  return ex_axios({
    method: 'post',
    url: uri,
    data: postData,
    headers: {
      Authorization: `Bearer ${jwtToken}`, // 토큰을 Authorization 헤더에 추가
    },
  })
};

// export const createPost = (boardId, postData) => {
//   return axios.post(`/post/${boardId}`, postData);
// };

export const updatePost = (post_id, postData) => {
  return axios.put(`/post/${post_id}`, postData);
};

export const readComment = (post_id) => {
  return axios.get(`/comment/${post_id}`);
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
    return 12;
  }else if(type=="post"){
    return 12;
  }
}

export const createComment = (post_id, commentData) => {
  return axios.post(`/comment/${post_id}`, commentData);
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