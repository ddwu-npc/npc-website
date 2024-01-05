import { useLoaderData } from "react-router-dom";

import { usePos } from "hooks";
import { getProjectList } from "api/project";

import styles from "./style.module.scss";

import PostButton from "./postButton";
import Search from "./search";
import Table from "./table";

import View, { loader as viewLoader } from "./view";
import Edit, { loader as editLoader } from "./edit";

export async function loader({ params, request }) {
  const searchParmas = new URL(request.url).searchParams;
  const search = {
    range: searchParmas.get("range"),
    searchRange: searchParmas.get("searchRange"),
    text: searchParmas.get("text"),
  };
  // 현재 1페이지
  const projectPaging = await getProjectList(search, 1);
  return { projectPaging };
}

export default () => {
  usePos("프로젝트");

  return (
    <div className={styles.board}>
      <div className={styles.upper}>
        <PostButton />
        <Search />
      </div>
      <Table />
    </div>
  );
};

export const viewRouter = { 
  element: <View/>,
  loader: viewLoader,
};

export const editRouter = {
  element: <Edit/>,
  loader: editLoader
};
