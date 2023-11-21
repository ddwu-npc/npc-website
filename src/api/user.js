import sha256 from "crypto-js/sha256";
import axios from "./axios";
import ex_axios from 'axios';

// 토큰 가져오기
export const getToken = () => {
  return localStorage.getItem('jwtToken');
};

export const getUserno = () => {
  const jwtToken = localStorage.getItem('jwtToken'); // localStorage에서 JWT 토큰 가져오기

  return ex_axios({
    method: 'get',
    url: '/login',
    headers: {
      Authorization: `Bearer ${jwtToken}`, // 토큰을 Authorization 헤더에 추가
    },
  }).then(response => {
      return response.data;
  })
};

// 게시글, 댓글 등에서 띄우는 간단한 유저 정보
// (다른 유저의 정보도 필요함 -> uri에 userId도 같이 받기 가람님이 구현한 형태 참고)
export function readUser(userno) {
  const uri = '/users/' + userno;
  return axios.get(uri).then(response => {
    if (response) {
      console.log(response);
      return response;
    }

// 마이페이지에서 띄우는 상세 유저 정보 (로그인한 유저의 정보)
export const readUserInfo = (userno) => {
  const uri = "/mypage?userno=" + userno;
  console.log(uri);
  return ex_axios({
    method: 'get',
    url: uri,
  }).then(response => {
      return response.data;
  })
};

// 마이페이지에서 띄우는 상세 유저 정보 수정 
export const updateUserInfo = (updatedInfo) => {
  return axios.put("/mypage/update", updatedInfo);
};

export const login = (loginId, raw_password) => {
  let password = sha256(raw_password).toString();

  return axios.post("/login", { userId: loginId, userPw: password }, true)
    .then(response => {
      // 로그인 성공 시 서버에서 받은 토큰을 localStorage에 저장
      if (response) {
        localStorage.setItem('jwtToken', JSON.stringify(response));
      }
      return response;
    });
};

export const logout = () => {
  localStorage.removeItem('jwtToken');
  return axios.post("/logout", {}, true);
};

export const signup = (loginId, raw_password, nickname, email) => {
  let password = sha256(raw_password).toString();
  return axios.post("/users", { userId: loginId, userPw: password, nickname, email }, true);
};

export const vaildateNickname = (nickname) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      if (nickname === "1234") resolve(false);
      else resolve(true);
    }, 100)
  );
};

export const vaildateLoginId = (loginId) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      if (loginId === "1234") resolve(false);
      else resolve(true);
    }, 100)
  );
};

export const vaildateEmail = (email) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      if (email === "1234@gmail.com") resolve(false);
      else resolve(true);
    }, 100)
  );
};
