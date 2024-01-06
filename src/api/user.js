import sha256 from "crypto-js/sha256";
import axios from "./axios";
import { getToken } from "./jwtToken";

export const getUserno = () => {
  const jwtToken = getToken(); // localStorage에서 JWT 토큰 가져오기
  const token = `Bearer ${jwtToken}` // 토큰을 Authorization 헤더에 추가

  return axios.getWithHeader('/login', token)
};


// 게시글, 댓글 등에서 띄우는 간단한 유저 정보
// (다른 유저의 정보도 필요함 -> uri에 userId도 같이 받기 가람님이 구현한 형태 참고)
export function readUser(userno) {
  const uri = '/users/' + userno;
  return axios.get(uri).then(response => {
    if (response) {
      //console.log("read user:" + JSON.stringify(response, null, 2));
      return response;
    }
  });
};

// 마이페이지에서 띄우는 상세 유저 정보 (로그인한 유저의 정보)
export const readUserInfo = (userno) => {
  const uri = "/mypage?userno=" + userno;
  return axios.get(uri);
};

// 사용자 프로필 사진
export const readUserFile = async (userno) => {
  try {
    const res = await axios.get(`/userfile/${userno}`);
    return res; 
  } catch (error) {
    console.error("첨부 파일을 가져오는 중 오류 발생:", error);
    throw error;
  }
};

// 마이페이지에서 띄우는 상세 유저 정보 수정 
export const updateUserInfo = (updatedInfo) => {
  return axios.put("/mypage/update", updatedInfo, {
    headers: {
      'Content-Type': 'multipart/form-data' 
    }
  });
};

export const login = (loginId, raw_password) => {
  let password = sha256(raw_password).toString();

  return axios.post("/login", { userId: loginId, userPw: password }, true)
    .then(response => {
      // 로그인 성공 시 서버에서 받은 토큰을 localStorage에 저장
      if (response) {
        localStorage.setItem('jwtToken', JSON.stringify(response));
        const me = readUser(getUserno(getToken()));
        sessionStorage.setItem('nickname', me.nickname);
      }
      return response;
    });
};

export const logout = () => {
  localStorage.removeItem('jwtToken');
  sessionStorage.removeItem('nickname');
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
