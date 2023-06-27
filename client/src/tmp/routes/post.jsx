import { useLoaderData } from "react-router-dom";
import { readPost } from "../api/post";

export async function loader({ params }) {
  const postId = params.postId;
  const post = await readPost(postId);

  return { postId, post };
}

export default () => {
  const { post } = useLoaderData();

  return <div>{JSON.stringify(post)}</div>;
};
