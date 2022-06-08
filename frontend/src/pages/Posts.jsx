import React, { Fragment, useEffect, useState } from "react";
import AllPosts from "../components/Posts/index.jsx";
import * as axios from "axios";
import Header from "../components/Header/index.jsx";

// TODO voir le chargement de la page *2

const Posts = () => {
  console.log("Posts");

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log("UseEffect Posts");
    axios
      .get("api/posts", {})
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Fragment>
      <Header />
      <AllPosts posts={posts} />
    </Fragment>
  );
};

export default Posts;
