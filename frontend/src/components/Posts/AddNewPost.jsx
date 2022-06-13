import React, { Fragment, useState } from "react";
import AddPostForm from "./AddPostForm";

const AddNewPost = ({ reload }) => {
  const [displayForm, setDisplayForm] = useState(false);
  const displayAddPostForm = () => {
    reload(false);
    setDisplayForm(true);
  };
  return (
    <Fragment>
      {!displayForm ? (
        <button onClick={displayAddPostForm} className="btn btn-add-post">
          Ajouter un post
        </button>
      ) : (
        <AddPostForm reload={reload} displayForm={setDisplayForm} />
      )}
    </Fragment>
  );
};

export default AddNewPost;
