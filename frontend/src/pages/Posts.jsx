import React, { Fragment, useContext, useEffect, useState } from "react";
import * as axios from "axios";
import Loader from "../components/Loader/Loader";
import Header from "../components/Header/Header";
import AddNewPost from "../components/Posts/AddNewPost";
import AllPosts from "../components/Posts/AllPosts";
import ScrollBtn from "../components/Buttons/ScrollBtn";
import { TokenContext } from "../contexts/token.context";
import { ThumbImgContext } from "../contexts/thumbnailImg.context";
import { OldImgUrlContext } from "../contexts/oldImgUrl.context";
import { NewImgUrlContext } from "../contexts/newImageUrl.context";
import { ReloadContext } from "../contexts/reload.context";
import { CharCountContext } from "../contexts/charCount.context";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [reload, setReload] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [oldImgUrl, setOldImgUrl] = useState("");
  const [newImgUrl, setNewImgUrl] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [token] = useContext(TokenContext);

  useEffect(() => {
    document.title = "Quoi de neuf chez Groupomania ?";
  }, []);

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
              <CharCountContext.Provider value={[charCount, setCharCount]}>
                <main>
                  {isLoading && <Loader />}

                  <Fragment>
                    <h1>Quoi de neuf ???</h1>
                    <AddNewPost />
                    <AllPosts posts={posts} />
                    <ScrollBtn />
                  </Fragment>
                </main>
              </CharCountContext.Provider>
            </ReloadContext.Provider>
          </NewImgUrlContext.Provider>
        </OldImgUrlContext.Provider>
      </ThumbImgContext.Provider>
    </Fragment>
  );
};

export default Posts;
