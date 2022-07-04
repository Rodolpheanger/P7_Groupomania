import React, { Fragment, useState, useContext } from "react";
import PostForm from "./PostForm";
import axios from "axios";
import { TokenContext } from "../../contexts/token.context";

const AddNewPost = ({ reload }) => {
  const [displayPostForm, setDisplayPostForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [token] = useContext(TokenContext);
  const openPostForm = () => {
    reload(false);
    setDisplayPostForm(true);
  };
  const submit = async (values, actions) => {
    actions.setSubmitting(false);
    try {
      if (!values.post_image || !selectedImage) {
        const { title, content } = values;
        const datas = { title, content };
        const response = await axios.post("api/posts", datas, {
          headers: {
            Authorization: `BEARER ${token}`,
          },
        });
        const { message, error } = response.data;
        reload(true);
        setDisplayPostForm(false);

        return error ? alert(error) : (console.log(message), reload(true));
      } else {
        const response = await axios.post("api/posts", values, {
          headers: {
            Authorization: `BEARER ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        const { message, error } = response.data;
        reload(true);
        setDisplayPostForm(false);
        return error ? alert(error) : (console.log(message), reload(true));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      {!displayPostForm ? (
        <button onClick={openPostForm} className="btn btn-add-post">
          Ajouter un post
        </button>
      ) : (
        <PostForm
          displayPostForm={setDisplayPostForm}
          submit={submit}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
      )}
    </Fragment>
  );
};

export default AddNewPost;
