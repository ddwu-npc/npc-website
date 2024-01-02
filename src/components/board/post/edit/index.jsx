import { Form } from "react-router-dom";
import { useState } from "react";

import Title from "./title";
import Content from "./content";

import styles from "./style.module.scss";
//import { upload } from "@testing-library/user-event/dist/upload";

export default () => {
  return (
    <Form className={styles.form} method="post" encType="multipart/form-data">
      <Title/>
      <Content />
      <div className={styles.bottom}>
        <button type="submit">업로드</button>
        <button onClick={() => window.location.reload()}>입력 취소</button>
      </div>
    </Form>
  );
};