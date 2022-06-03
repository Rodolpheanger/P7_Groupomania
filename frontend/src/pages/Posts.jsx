import React, { useContext, useEffect, useState } from "react";
import AllPosts from "../components/Posts/index.jsx";
import * as axios from "axios";
import { AuthContext } from "../components/MyContexts.jsx";

// TODO voir le chargement de la page *2

const Posts = () => {
  console.log("Posts");
  const token = useContext(AuthContext);

  const [posts, setPosts] = useState([]);

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
    <div>
      <AllPosts posts={posts} />
    </div>
  );
};

export default Posts;
