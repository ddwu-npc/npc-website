import axios from "./axios";

export const readPost = (post_id) => {
  return axios.get(`/post/${post_id}`, 
    {
      post_id,
      board_id: 1,
      userno: 1,
      title: "임시 게시글입니다.",
      content: "임시 게시글입니다. 이곳에는 게시글의 내용을 포함합니다.",
      create_date: "2022-08-08",
      important: true,
      range: "임원",
      read_count: "5",
      attachment: [{ name: "임시 파일1.pdf" }, { name: "임시 파일2.pdf" }],
    }
  );
};

export const createPost = (boardId, postData) => {
  return axios.post(`/post/${boardId}`, postData);
};

export const updatePost = (post_id, postData) => {
  return axios.put(`/post/${post_id}`, postData);
};

export const readComment = (post_id) => {
  return axios.get(`/comment/${post_id}`, 
    [
      {
        comment_id: 1,
        userno: 1,
        create_date: "2022-08-08",
        content: "임시 게시글입니다.",
      },
      {
        comment_id: 2,
        userno: 1,
        create_date: "2022-08-08",
        content: "임시 게시글입니다.",
      },
      {
        comment_id: 3,
        userno: 1,
        create_date: "2022-08-08",
        content: "임시 게시글입니다.",
      },
    ]);
};

export const deletePost = (post_id) => {
  return axios.delete(`/post/${post_id}`);
};

export const createComment = (post_id, commentData) => {
  return axios.post(`/comment/${post_id}`, commentData);
};

export const deleteComment = (comment_id) => {
  return axios.delete(`/comment/${comment_id}`);
};

// 유저가 생성한 comment들 리스트 받아와야 함. (mypage 용)
export const getCommentListByUserId = (user_id) => {
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
              content: "임시 댓글입니다.",
              create_date: "2022-08-08",
            },
            {
              board_id: 1,
              post_id: 1,
              content: "임시 댓글입니다.",
              create_date: "2022-08-08",
            },
            {
              board_id: 1,
              post_id: 1,
              content: "임시 댓글입니다.",
              create_date: "2022-08-08",
            },
            {
              board_id: 1,
              post_id: 1,
              content: "임시 댓글입니다.",
              create_date: "2022-08-08",
            },
            {
              board_id: 1,
              post_id: 1,
              content: "임시 댓글입니다.",
              create_date: "2022-08-08",
            },
          ],
        }),
      100
    )
  );
};
