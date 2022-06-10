import React, { Fragment, useState } from "react";
import AddPostForm from "./AddPostForm";

const AddNewPost = () => {
  const [displayForm, setDisplayForm] = useState(false);
  const displayAddPostForm = () => {
    setDisplayForm(true);
  };
  return (
    <Fragment>
      {!displayForm ? (
        <button onClick={displayAddPostForm} className="btn btn-add-post">
          Ajouter un post
        </button>
      ) : (
        <AddPostForm />
      )}
    </Fragment>
  );
};

export default AddNewPost;
