import React, { Fragment, useContext, useEffect, useState } from "react";
import AllPosts from "../components/Posts/AllPosts";
import AddNewPost from "../components/Posts/AddNewPost";
import * as axios from "axios";
import Header from "../components/Header/Header";
import { TokenContext } from "../contexts/token.context";
import { ThumbImgContext } from "../contexts/thumbnailImg.context";
import { OldImgUrlContext } from "../contexts/oldImgUrl.context";
import { NewImgUrlContext } from "../contexts/newImageUrl.context";
import { ReloadContext } from "../contexts/reload.context";
import Loader from "../components/Loader/Loader";
const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [reload, setReload] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [oldImgUrl, setOldImgUrl] = useState("");
  const [newImgUrl, setNewImgUrl] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [token] = useContext(TokenContext);

  useEffect(() => {
    const getPosts = async () => {
      setIsloading(true);
      try {
        const response = await axios.get("api/posts", {
          headers: {
            Authorization: `BEARER ${token}`,
          },
        });
        setPosts(response.data);
        setIsloading(false);
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
          <NewImgUrlContext.Provider value={[newImgUrl, setNewImgUrl]}>
            <ReloadContext.Provider value={[reload, setReload]}>
              <main>
                {isLoading && <Loader />}

                <Fragment>
                  <h1>Quoi de neuf ???</h1>
                  <AddNewPost />
                  <AllPosts posts={posts} />
                </Fragment>
              </main>
            </ReloadContext.Provider>
          </NewImgUrlContext.Provider>
        </OldImgUrlContext.Provider>
      </ThumbImgContext.Provider>
    </Fragment>
  );
};

export default Posts;
