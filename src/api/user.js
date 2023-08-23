import sha256 from 'crypto-js/sha256';
import axios from "./axios";

// 게시글, 댓글 등에서 띄우는 간단한 유저 정보 
// (다른 유저의 정보도 필요함 -> uri에 userId도 같이 받기 가람님이 구현한 형태 참고)
export function readUser(userno) {
  return axios.get("/mypage", {
    userno,
    nickname: "[NAME]",
    profile: "profile",
  });
}

// 마이페이지에서 띄우는 상세 유저 정보 (로그인한 유저의 정보)
export const readUserInfo = (userno) => {
  return axios.get("/mypage", {
    userno,
    nickname: "[NAME]",
    profile: "profile",
    email: "1234@gmail.com",
    birthday: "2023.05.27",
    npc_point: "10",
    rank: "동장",
  });
};

export const login = (loginId, raw_password) => {
  let password = sha256(raw_password).toString();
  
  return new Promise((resolve) =>
    setTimeout(() => {
      if (loginId === "1234" && password === sha256("1234").toString()) {
        sessionStorage.setItem("loginSession", 1);
        resolve(true);
      } else resolve(false);
    }, 100)
  );
};
export const logout = () => {
  return new Promise((resolve) =>
    setTimeout(() => {
      sessionStorage.setItem("loginSession", "");
      resolve(true);
    }, 100)
  );
};

export const getLoginSession = () => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(sessionStorage.getItem("loginSession"));
    }, 100)
  );
};

export const signup = (loginId, raw_password, nickname, email) => {
  let password = sha256(raw_password).toString();

  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(true);
    }, 100)
  );
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
