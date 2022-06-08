import { Fragment } from "react";
import Card from "./Card";

const AllPosts = ({ posts }) => {
  console.log("AllPosts");
  return (
    <main>
      <h1>Quoi de neuf ???</h1>
      {posts.map((post) => (
        <Card post={post} key={post.p_uid} />
      ))}
    </main>
  );
};

export default AllPosts;
