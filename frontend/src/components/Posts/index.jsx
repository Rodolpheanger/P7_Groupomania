import { Fragment } from "react";

const AllPosts = ({ posts }) => {
  console.log("AllPosts");
  return (
    <Fragment>
      {posts.map((post) => (
        <div key={post.p_uid}>{post.p_title}</div>
      ))}
    </Fragment>
  );
};

export default AllPosts;
