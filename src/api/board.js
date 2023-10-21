import axios from "./axios";

// 게시판이 어떤게 있는지 리스트 필요
export function getBoardList() {
  // none
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve([
          { board_id: 1, bname: "공지사항" },
          { board_id: 2, bname: "강의자료" },
          { board_id: 3, bname: "자유 게시판" },
          { board_id: 4, bname: "구인 게시판" },
        ]),
      100
    )
  );
}

export function getPostList(board_id, search) {
  return axios.get(`/board/${board_id}`);
}

// board_id로 게시판 이름 가져올 수 있어야 함.
export const getBName = (board_id) => {
  // none
  return new Promise((resolve) =>
    setTimeout(() => resolve(`임시게시판_${board_id}`), 100)
  );
};

// 유저가 생성한 post들 리스트 받아와야 함. (mypage 용)
export const getPostListByUserId = (user_id) => {
  // none
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          count: 20,

          // 최근 5개 post
          preview: [
            {
              board_id: 1,
              post_id: 1,
              content: "임시 게시글입니다.", // title
              create_date: "2022-08-08",
            },
            {
              board_id: 1,
              post_id: 1,
              content: "임시 게시글입니다.",
              create_date: "2022-08-08",
            },
            {
              board_id: 1,
              post_id: 1,
              content: "임시 게시글입니다.",
              create_date: "2022-08-08",
            },
            {
              board_id: 1,
              post_id: 1,
              content: "임시 게시글입니다.",
              create_date: "2022-08-08",
            },
            {
              board_id: 1,
              post_id: 1,
              content: "임시 게시글입니다.",
              create_date: "2022-08-08",
            },
          ],
        }),
      100
    )
  );
};
