import AddNewPost from "./AddNewPost";
import Card from "./Card";

const AllPosts = ({ posts }) => {
  console.log("AllPosts");
  console.log("Log des posts: ", posts);
  return (
    <main>
      <h1>Quoi de neuf ???</h1>
      <AddNewPost />
      {posts.map((post) => (
        <Card post={post} key={post.p_uid} />
      ))}
    </main>
  );
};

export default AllPosts;
