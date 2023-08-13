export const readPost = (post_id) => {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
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
        }),
      100
    )
  );
};

export const createPost = (boardId, postData) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      console.log(postData);
      resolve(true);
    }, 100)
  );
};

export const updatePost = (post_id, postData) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      console.log(post_id, postData);
      resolve(true);
    }, 100)
  );
};

export const readComment = (post_id) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve([
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
    }, 100)
  );
};

export const deletePost = (post_id) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      console.log("delete post " + post_id);
      resolve(true);
    }, 100)
  );
};

export const createComment = (post_id, commentData) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      console.log(JSON.stringify(commentData));
      resolve(true);
    }, 100)
  );
};

export const deleteComment = (comment_id) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(true);
    }, 100)
  );
};

export const getCommentListByUserId = (user_id) => {
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
