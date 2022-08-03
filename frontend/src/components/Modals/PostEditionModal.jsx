import React, { Fragment } from "react";
import PostForm from "../Posts/PostForm";

const PostEditionModal = ({
  submit,
  postTitle,
  postContent,
  close,
  serverErrorMessage,
}) => {
  return (
    <Fragment>
      <PostForm
        submit={submit}
        title={postTitle}
        content={postContent}
        close={close}
        serverErrorMessage={serverErrorMessage}
      />
    </Fragment>
  );
};

export default PostEditionModal;
