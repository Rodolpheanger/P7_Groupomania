import React, { Fragment, useContext, useEffect, useState } from "react";
import { NewImgUrlContext } from "../../contexts/newImageUrl.context";
import { OldImgUrlContext } from "../../contexts/oldImgUrl.context";
import { ThumbImgContext } from "../../contexts/thumbnailImg.context";
import CloseBtn from "../Buttons/CloseBtn";
import defaultAvatar from "../../styles/assets/img/icons/abstract-user-flat-4.png";

const Thumbnail = ({ setFieldValue, className }) => {
  const [selectedImage, setSelectedImage] = useContext(ThumbImgContext);
  const [oldImgUrl, setOldImgUrl] = useContext(OldImgUrlContext);
  const [imageToDisplay, setImageToDisplay] = useState(selectedImage);
  const [newImgUrl, setNewImgUrl] = useContext(NewImgUrlContext);

  const close = () => {
    console.log("close");
    setSelectedImage(null);
    setNewImgUrl(null);
  };

  const closeOld = () => {
    setOldImgUrl("");
  };

  useEffect(() => {
    console.log("useEffect Thumbnail");
    if (selectedImage) {
      setImageToDisplay(
        <div className={`thumbnail-wrapper ${className}`}>
          <img src={newImgUrl} alt={selectedImage.name} className="thumbnail" />
          <CloseBtn close={close} />
        </div>
      );
    } else if (oldImgUrl) {
      console.log("oldImgUrl: ", oldImgUrl);
      setImageToDisplay(
        <div className={`thumbnail-wrapper ${className}`}>
          <img
            src={oldImgUrl}
            alt={"Selection précédente"}
            className="thumbnail"
          />
          <CloseBtn close={closeOld} />
        </div>
      );
    } else {
      if (className.includes("avatar")) {
        setImageToDisplay(
          <div className={`thumbnail-wrapper ${className}`}>
            <img
              src={defaultAvatar}
              alt="Avatar Neutre"
              className="thumbnail"
            />
          </div>
        );
      } else {
        setImageToDisplay("");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedImage, oldImgUrl, newImgUrl]);

  return <Fragment>{imageToDisplay}</Fragment>;
};

export default Thumbnail;
