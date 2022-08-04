import PostForm from "../Posts/PostForm";

const PostEditionModal = ({
  submit,
  postTitle,
  postContent,
  close,
  serverErrorMessage,
}) => {
  return (
    <PostForm
      submit={submit}
      title={postTitle}
      content={postContent}
      close={close}
      serverErrorMessage={serverErrorMessage}
    />
  );
};

export default PostEditionModal;
