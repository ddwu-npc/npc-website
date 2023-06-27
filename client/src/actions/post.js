export const createPost = (postData) => {
    console.log("post create!!!");
    const post_id = 1;
    return post_id;
  };
  export const readPost = (post_id, callback) => {
    // post 정보 리턴
    callback({
      post_id,
      board_id: 1,
      userno: 1,
      title: "임시 게시글입니다.",
      content: "임시 게시글입니다. 이곳에는 게시글의 내용을 포함합니다.",
      create_date: "2022-08-08",
      important: true,
      range: "임원",
      read_count: "5",
    });
  };
  export const updatePost = (post_id, postData) => {
    console.log("post update!!!");
    return true;
  };
  export const deletePost = (post_id) => {
    console.log("post delete!!!");
    return true;
  };
  
  export const readComment = (post_id, callback) => {
    callback([
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
  export const createComment = (post_id, commentData) => {
    //    commentData = {
    //     userno,
    //     content,
    //    }
  };
  
  export const getPostFile = (post_id, callback) => {
    callback("link");
  };