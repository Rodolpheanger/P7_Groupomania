import React, { Fragment, useContext, useEffect, useState } from "react";
import AllPosts from "../components/Posts/AllPosts.jsx";
import AddNewPost from "../components/Posts/AddNewPost";
import * as axios from "axios";
import Header from "../components/Header/Header.jsx";
import { TokenContext } from "../contexts/token.context";
import { ThumbImgContext } from "../contexts/thumbnailImg.context.jsx";
import { OldImgUrlContext } from "../contexts/oldImgUrl.context.jsx";
const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [reload, setReload] = useState(false);
  const [token] = useContext(TokenContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [oldImgUrl, setOldImgUrl] = useState("");

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
      <ThumbImgContext.Provider value={[selectedImage, setSelectedImage]}>
        <OldImgUrlContext.Provider value={[oldImgUrl, setOldImgUrl]}>
          <main>
            <h1>Quoi de neuf ???</h1>
            <AddNewPost reload={setReload} />
            <AllPosts posts={posts} reload={setReload} />
          </main>
        </OldImgUrlContext.Provider>
      </ThumbImgContext.Provider>
    </Fragment>
  );
};

export default Posts;
