import React, { Fragment, useContext, useEffect, useState } from "react";
import AllPosts from "../components/Posts/AllPosts.jsx";
import * as axios from "axios";
import Header from "../components/Header/Header.jsx";
// import { useToken } from "../utils/auth.utils.js";
import { AuthContext } from "../contexts/auth.context";

// TODO voir le chargement de la page *2

const Posts = () => {
  console.log("Posts");
  // const { token } = useToken();
  const [posts, setPosts] = useState([]);
  const [token] = useContext(AuthContext);
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
  }, [token]);

  return (
    <Fragment>
      <Header />
      <AllPosts posts={posts} />
    </Fragment>
  );
};

export default Posts;
