import axios from "./axios";
import ex_axios from "axios";
import { getToken } from "./jwtToken";
import post from "components/board/post";

export const readPost = (post_id) => {
  const jwtToken = getToken();
  const token = `Bearer ${jwtToken}` 

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

export const readFile = async (post_id) => {
  try {
    const res = await axios.get(`/files/${post_id}`);
    return res; // 응답에 파일 데이터가 포함되어 있다고 가정합니다.
  } catch (error) {
    console.error("첨부 파일을 가져오는 중 오류 발생:", error);
    throw error;
  }
};

export  const downloadFile = (fileName) => {
  const jwtToken = getToken();
  axios.get(`/files/download/${fileName}`, {
      withCredentials: true,
      headers: {
          'Authorization': `Bearer ${jwtToken}`
      },
      responseType: 'blob'
  })
      .then(res => {
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const a = document.createElement('a');
          a.href = url;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
      })
      .catch(error => {
          console.error('파일 다운로드 중 오류 발생 :', error);
      });
};
/*
export const downloadFile = async (fileName) => {
  try {
    const response = await axios.get(`/files/download/${fileName}`, {
      responseType: 'arraybuffer', // 데이터를 ArrayBuffer로 받도록 설정
    });

    // 파일을 Blob으로 변환
    //const blob = new Blob([response.data], { type: response.headers['blob'] });
    //console.log("blob", blob);

    // a 태그를 생성하고 다운로드 링크 설정
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(new Blob([response.data]));
    link.download = fileName;

    // 링크를 추가하고 클릭하여 다운로드
    document.body.appendChild(link);
    link.click();

    // 링크 제거
    document.body.removeChild(link);
  } catch (error) {
    console.error('다운로드 실패:', error);
  }
};
*/
/*
export const downloadFile = async (fileName)=>{
  try {
    const response = await axios.get(`/files/download/${fileName}`,{responseType: 'blob',});
    // 파일 다운로드를 위한 코드
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('다운로드 실패:', error);
  }
}
*/

export const createComment = (post_id, commentData, token) => {
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