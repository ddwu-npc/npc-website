import sha256 from "crypto-js/sha256";
import axios from "./axios";
import haxios from 'axios';

// 토큰 가져오기
export const getToken = () => {
  return localStorage.getItem('jwtToken');
};

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

  return axios.post("/login", { userId: loginId, userPw: password }, true)
    .then(response => {
      // 로그인 성공 시 서버에서 받은 토큰을 localStorage에 저장
      if (response) {
        localStorage.setItem('jwtToken', JSON.stringify(response)); // 객체를 문자열로 변환하여 저장
      }
      return response; // 서버에서 받은 응답 전체를 반환합니다.
    })
    .catch(error => {
      // 에러 처리
      console.error('Login failed:', error);
      throw error;
    });
};

export const logout = () => {
  localStorage.removeItem('jwtToken');
  return axios.post("/logout", {}, true);
};

export const getUserno = () => {
  const jwtToken = localStorage.getItem('jwtToken'); // localStorage에서 JWT 토큰 가져오기

  if (!jwtToken) {
    // 토큰이 없으면 에러 처리 또는 다른 작업 수행
    return Promise.reject("토큰이 없습니다.");
  }

  const uri = "/login"; // 실제 GET 요청을 보낼 엔드포인트로 대체해야 합니다.

  return haxios({
    method: 'get',
    url: uri,
    headers: {
      Authorization: `Bearer ${jwtToken}`, // 토큰을 Authorization 헤더에 추가
    },
  })
    .then(response => {
      // 서버로부터 받은 응답 데이터를 반환
      return response.data;
    })
    .catch(error => {
      // 오류 처리
      console.error('Error:', error);
      throw error;
    });
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
