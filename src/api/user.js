import sha256 from "crypto-js/sha256";
import axios from "./axios";
import { getToken } from "./jwtToken";

export const getUserno = () => {
  return axios.getWithHeader('/login');
};

// 게시글, 댓글 등에서 띄우는 간단한 유저 정보
export function readUser(userno) {
  const uri = '/users/' + userno;
  return axios.get(uri);
};

// 마이페이지에서 띄우는 상세 유저 정보 (로그인한 유저의 정보)
export const readUserInfo = (userno) => {
  const uri = "/mypage?userno=" + userno;
  return axios.get(uri);
};

// 사용자 프로필 사진
export const readUserFile = async (userno) => {
  return axios.get(`/userfile/${userno}`);
};

// 마이페이지에서 띄우는 상세 유저 정보 수정 
export const updateUserInfo = (updatedInfo) => {
  return axios.put("/mypage/update", updatedInfo);
};

// 프로젝트 팀원 추가를 위한 팀원명 찾기
export const addProjectUser = (nickname) => {
  return axios.get(`/users/find/${nickname}`);
};

export const login = (loginId, raw_password) => {
  let password = sha256(raw_password).toString();

  return axios.post("/login", { userId: loginId, userPw: password }, true)
    .then(response => {
      // 로그인 성공 시 서버에서 받은 토큰을 localStorage에 저장
      if (response) {
        localStorage.setItem('jwtToken', JSON.stringify(response));
        const me = readUser(getUserno());
        sessionStorage.setItem('nickname', me.nickname);
      }
      return response;
    });
};

export const logout = () => {
  localStorage.removeItem('jwtToken');
  sessionStorage.removeItem('nickname');
  //return axios.post("/logout", {}, true);
};

export const signup = (loginId, raw_password, nickname, email) => {
  let password = sha256(raw_password).toString();
  return axios.post("/users", { userId: loginId, userPw: password, nickname, email }, true);
};

export const vaildateNickname = (nickname) => {
  return axios.post("/users/checkNickname", {nickname: nickname});
};

export const vaildateLoginId = (loginId) => {
  return axios.post("/users/checkUserId", {userId: loginId});
};

export const vaildateEmail = (email) => {
  return axios.post("/users/checkEmail", {email: email});
};

export const validateUser = (loginId, email) => {
  return axios.get("/users/checkUser/" + loginId + "/" + email);
};

export const forgetPassword = (loginId, raw_password) => {
  let password = sha256(raw_password).toString();
  return axios.put("/users/forgetPassword", {userId: loginId, password: password});
};
