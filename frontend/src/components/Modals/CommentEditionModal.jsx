import CloseBtn from "../Buttons/CloseBtn";
import CommentsForm from "../Comments/CommentsForm";

const CommentEditionModal = ({
  submit,
  oldComment,
  close,
  serverErrorMessage,
}) => {
  return (
    <article className="modal comment-edition-modal">
      <CommentsForm
        submit={submit}
        oldComment={oldComment}
        label={"Editer le commentaire"}
        serverErrorMessage={serverErrorMessage}
        modal={true}
      />
      <CloseBtn close={close} />
    </article>
  );
};

export default CommentEditionModal;
