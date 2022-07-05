import React, { Fragment, useContext, useEffect, useState } from "react";
import AllPosts from "../components/Posts/AllPosts.jsx";
import AddNewPost from "../components/Posts/AddNewPost";
import * as axios from "axios";
import Header from "../components/Header/Header.jsx";
import { TokenContext } from "../contexts/token.context";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [reload, setReload] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [token] = useContext(TokenContext);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get("api/posts", {
          headers: {
            Authorization: `BEARER ${token}`,
          },
        });
        setPosts(response.data);
        setReload(false);
      } catch (err) {
        console.log(err);
      }
    };
    getPosts();
  }, [token, reload]);

  return (
    <Fragment>
      <Header />
      <main>
        <h1>Quoi de neuf ???</h1>
        <AddNewPost
          reload={setReload}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
        <AllPosts
          posts={posts}
          reload={setReload}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
      </main>
    </Fragment>
  );
};

export default Posts;
