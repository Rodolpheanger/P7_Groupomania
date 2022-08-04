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
    <section className="btn-post-header">
      {canUpdate && (
        <button
          className="fa-solid fa-pen"
          title="Modifier"
          onClick={() => {
            setDisplayPostEditionModal(true);
            setOldImgUrl(postImgUrl);
          }}
          tabIndex={0}
        ></button>
      )}
      {canDelete && (
        <button
          className="fa-solid fa-trash-can"
          title="Supprimer"
          onClick={() => {
            setDisplayConfirmationModal(true);
          }}
          tabIndex={0}
        ></button>
      )}
    </section>
  );
};

export default PostHeaderButtons;
