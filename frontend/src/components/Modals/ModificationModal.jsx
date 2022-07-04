import React, { Fragment } from "react";
import PostForm from "../Posts/PostForm";

const ModificationModal = ({ postTitle, postContent, close }) => {
  return (
    <Fragment>
      <PostForm title={postTitle} content={postContent} close={close} />
    </Fragment>
  );
};

export default ModificationModal;
