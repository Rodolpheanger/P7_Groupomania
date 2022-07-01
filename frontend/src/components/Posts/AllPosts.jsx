import { Fragment } from "react";
import Card from "./Card";

const AllPosts = ({ posts, reload }) => {
  return (
    <Fragment>
      {posts.map((post) => (
        <Card post={post} key={post.p_uid} reload={reload} />
      ))}
    </Fragment>
  );
};

export default AllPosts;
