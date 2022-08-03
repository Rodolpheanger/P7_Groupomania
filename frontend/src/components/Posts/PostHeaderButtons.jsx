import React, { useContext, useEffect, useState } from "react";
import { OldImgUrlContext } from "../../contexts/oldImgUrl.context";

const PostHeaderButtons = ({
  userRole,
  userUid,
  postUserUid,
  postImgUrl,
  setDisplayPostEditionModal,
  setDisplayConfirmationModal,
}) => {
  const [canUpdate, setCanUpdate] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [, setOldImgUrl] = useContext(OldImgUrlContext);

  useEffect(() => {
    if (userRole === "admin" || userUid === postUserUid) setCanDelete(true);
    if (userUid === postUserUid) setCanUpdate(true);
  }, [userRole, userUid, postUserUid]);

  return (
    <div className="btn-post-header">
      {canUpdate && (
        <i
          className="fa-solid fa-pen"
          title="Modifier"
          onClick={() => {
            setDisplayPostEditionModal(true);
            setOldImgUrl(postImgUrl);
          }}
          tabIndex={0}
        ></i>
      )}
      {canDelete && (
        <i
          className="fa-solid fa-trash-can"
          title="Supprimer"
          onClick={() => {
            setDisplayConfirmationModal(true);
          }}
          tabIndex={0}
        ></i>
      )}
    </div>
  );
};

export default PostHeaderButtons;
