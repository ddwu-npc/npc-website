import axios from "./axios";

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
  return axios.get(`/board/${board_id}`, 
    [{
        post_id: 1,
        userno: 1,
        title: "임시 게시글입니다.",
        create_date: "2022-08-08",
        important: 1,
        range: "전체",
      },
      {
        post_id: 2,
        userno: 1,
        title: "임시 게시글입니다.",
        create_date: "2022-08-08",
        important: 0,
        range: "전체",
      },
      {
        post_id: 3,
        userno: 1,
        title: "임시 게시글입니다.",
        create_date: "2022-08-08",
        important: 1,
        range: "전체",
      },
    ]);
}

export const getBName = (board_id) => {
  // none
  return new Promise((resolve) =>
    setTimeout(() => resolve(`임시게시판_${board_id}`), 100)
  );
};

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
