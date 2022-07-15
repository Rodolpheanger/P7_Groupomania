import React, { Fragment } from "react";
import PostForm from "../Posts/PostForm";

const PostEditionModal = ({ submit, postTitle, postContent, close }) => {
  return (
    <Fragment>
      <PostForm
        submit={submit}
        title={postTitle}
        content={postContent}
        close={close}
      />
    </Fragment>
  );
};

export default PostEditionModal;