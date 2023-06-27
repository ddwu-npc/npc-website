import axios from "axios";

export const getBoardList = (callback) => {
  // Board 목록 리턴
  callback([
    { board_id: 1, bname: "공지사항" },
    { board_id: 2, bname: "강의자료" },
    { board_id: 3, bname: "자유 게시판" },
    { board_id: 4, bname: "구인 게시판" },
  ]);
};
export const getPostList = (board_id, search, callback) => {
  // search = {
  //     range: null, // '전체', '임원', '팀장',
  //     search_range: null, // '제목', '내용', '제목+내용', '작성자',
  //     word: null,
  // }

  // Post 목록 리턴
  axios
    .get(`/board/${board_id}`)
    .then((res) => {
      console.log("res", res.data);
      callback(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  /*
    return [
        {
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
    ];
    */
};

export const getBName = (board_id, callback) => {
  callback("임시게시판");
};
export const setImportantPost = (board_id, post_id, important) => {
  // important는 0/1
  console.log("post important 설정!!!");
};
