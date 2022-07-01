import React, { Fragment, useContext, useEffect, useState } from "react";
import AllPosts from "../components/Posts/AllPosts.jsx";
import AddNewPost from "../components/Posts/AddNewPost";
import * as axios from "axios";
import Header from "../components/Header/Header.jsx";
import { TokenContext } from "../contexts/token.context";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [token] = useContext(TokenContext);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    axios
      .get("api/posts", {
        headers: {
          Authorization: `BEARER ${token}`,
        },
      })
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
    setReload(false);
  }, [token, reload]);

  return (
    <Fragment>
      <Header />
      <main>
        <h1>Quoi de neuf ???</h1>
        <AddNewPost reload={setReload} />
        <AllPosts posts={posts} reload={setReload} />
      </main>
    </Fragment>
  );
};

export default Posts;
