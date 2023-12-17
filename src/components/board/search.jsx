import { createRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.scss";

export default () => {
  const formRef = createRef();
  const submitRef = createRef();
  const navigate = useNavigate();  // 추가

  useEffect(() => {
    submitRef.current.onclick = () => {
      //formRef.current.submit();
      HandleSubmit();
    };
  });

  const HandleSubmit = () => {
    const formData = new FormData(formRef.current);
    const queryParams = new URLSearchParams(formData).toString();

    console.log("queryParams", queryParams);

    //navigate(`/board/1/search?${queryParams}`);
    fetch(`/board/1/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: queryParams,
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Handle the response data as needed
      })
      .catch(error => console.error(error));

    // No need to navigate here if the POST request is handled asynchronously
  };

  return (
    <form className={styles.search} ref={formRef}>
      <select name="rangePost">
        <option value="0">전체</option>
        <option value="1">임원</option>
        <option value="2">팀장</option>
      </select>
      <select name="searchRange">
        <option value="0">제목</option>
        <option value="1">내용</option>
        <option value="2">제목 + 내용</option>
        <option value="3">작성자</option>
      </select>
      <input name="text" type="text" placeholder="search"></input>
      <div className={styles.button} ref={submitRef}>
        <Icon icon="akar-icons:search" />
      </div>
    </form>
  );
};
