import { useContext, useEffect, useState } from "react";
import { UserRoleContext } from "../../contexts/userRole.context";
import { UserUidContext } from "../../contexts/userUid.context";

const CommentsBodyButtons = ({
  commentUserUid,
  setDisplayCommentEditionModal,
  setDisplayCommentDeleteModal,
}) => {
  const [canUpdate, setCanUpdate] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [userRole] = useContext(UserRoleContext);
  const [userUid] = useContext(UserUidContext);

  useEffect(() => {
    if (userUid === commentUserUid) setCanUpdate(true);
    if (userRole === "admin" || userUid === commentUserUid) setCanDelete(true);
  }, [userRole, userUid, commentUserUid]);

  return (
    <div className="btn-post-header">
      {canUpdate && (
        <button
          className="fa-solid fa-pen"
          title="Modifier"
          onClick={() => {
            setDisplayCommentEditionModal(true);
          }}
          tabIndex={0}
        ></button>
      )}
      {canDelete && (
        <button
          className="fa-solid fa-trash-can"
          title="Supprimer"
          onClick={() => {
            setDisplayCommentDeleteModal(true);
          }}
          tabIndex={0}
        ></button>
      )}
    </div>
  );
};

export default CommentsBodyButtons;
