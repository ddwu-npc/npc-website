export function readUser(userno) {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          userno,
          nickname: "[NAME]",
          profile: "profile",
        }),
      100
    )
  );
}
export const readUserInfo = (userno) => {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          userno,
          nickname: "[NAME]",
          profile: "profile",
          email: "1234@gmail.com",
          birthday: "2023.05.27",
          npc_point: "10",
          rank: "동장",
        }),
      100
    )
  );
};

export const login = (loginId, password) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      if (loginId === "1234" && password === "1234") {
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

export const signup = (loginId, password, nickname, email) => {
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
