import React, { Fragment, useContext, useEffect, useState } from "react";
import AllPosts from "../components/Posts/AllPosts.jsx";
import AddNewPost from "../components/Posts/AddNewPost";
import * as axios from "axios";
import Header from "../components/Header/Header.jsx";
import { AuthContext } from "../contexts/auth.context";

const Posts = () => {
  console.log("Posts");
  const [posts, setPosts] = useState([]);
  const [token] = useContext(AuthContext);
  const [reload, setReload] = useState(false);
  console.log("Token dans Post: ", token);

  useEffect(() => {
    console.log("UseEffect Posts");
    axios
      .get("api/posts", {
        headers: {
          Authorization: `BEARER ${token}`,
        },
      })
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  }, [token, reload]);

  return (
    <Fragment>
      <Header />
      <main>
        <h1>Quoi de neuf ???</h1>
        <AddNewPost reload={setReload} />
        <AllPosts posts={posts} />
      </main>
    </Fragment>
  );
};

export default Posts;
