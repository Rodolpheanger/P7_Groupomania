import { Fragment } from "react";
import Card from "./Card";

const AllPosts = ({ posts }) => {
  console.log("AllPosts");
  console.log("Log des posts: ", posts);
  return (
    <Fragment>
      {posts.map((post) => (
        <Card post={post} key={post.p_uid} />
      ))}
    </Fragment>
  );
};

export default AllPosts;
