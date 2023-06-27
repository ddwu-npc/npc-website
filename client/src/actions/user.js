export const readUser = (userno) => {
  // 간단한 정보
  return {
    userno,
    nickname: "[NAME]",
    profile: "profile",
  };
};
export const readUserInfo = (userno) => {
  // 상세 정보까지
  return {};
};

export const login = (loginId, password) => {
  if (!loginId || !password) return null;
};

export const signup = (loginId, password, nickname, email) => {
  if (!loginId || !password || !nickname || !email) return null;

  const userno = 1;
  return userno;
};