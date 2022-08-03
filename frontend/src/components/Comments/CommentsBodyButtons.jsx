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
    if (userRole === "admin" || userUid === commentUserUid) setCanDelete(true);
    if (userUid === commentUserUid) setCanUpdate(true);
  }, [userRole, userUid, commentUserUid]);

  return (
    <div className="btn-post-header">
      {canUpdate && (
        <i
          className="fa-solid fa-pen"
          title="Modifier"
          onClick={() => {
            setDisplayCommentEditionModal(true);
          }}
          tabIndex={0}
        ></i>
      )}
      {canDelete && (
        <i
          className="fa-solid fa-trash-can"
          title="Supprimer"
          onClick={() => {
            setDisplayCommentDeleteModal(true);
          }}
          tabIndex={0}
        ></i>
      )}
    </div>
  );
};

export default CommentsBodyButtons;
