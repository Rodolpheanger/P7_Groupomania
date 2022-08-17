import { Fragment, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useFormikContext } from "formik";
import defaultAvatar from "../../styles/assets/img/icons/abstract-user-flat-4.png";
import CloseBtn from "../Buttons/CloseBtn";
import { NewImgUrlContext } from "../../contexts/newImageUrl.context";
import { OldImgUrlContext } from "../../contexts/oldImgUrl.context";
import { ThumbImgContext } from "../../contexts/thumbnailImg.context";

const Thumbnail = ({ className }) => {
  const [imageToDisplay, setImageToDisplay] = useState("");
  const [selectedImage, setSelectedImage] = useContext(ThumbImgContext);
  const [oldImgUrl, setOldImgUrl] = useContext(OldImgUrlContext);
  const [newImgUrl, setNewImgUrl] = useContext(NewImgUrlContext);
  const { setFieldValue } = useFormikContext();
  const location = useLocation();
  const { pathname } = location;
  const getFieldValueName = () => {
    if (pathname === "/profil") {
      return "avatar";
    } else if (pathname === "/posts") return "post_image";
  };
  const fieldValueName = getFieldValueName();

  const close = () => {
    setFieldValue(fieldValueName, "");
    setSelectedImage("");
    setNewImgUrl("");
  };

  const closeOld = () => {
    setFieldValue(fieldValueName, "");
    setOldImgUrl("");
    setNewImgUrl("");
    setSelectedImage("");
  };

  useEffect(() => {
    if (selectedImage) {
      setImageToDisplay(
        <div className={`thumbnail-wrapper ${className}`}>
          <img src={newImgUrl} alt={selectedImage.name} className="thumbnail" />
          <CloseBtn close={close} />
        </div>
      );
    } else if (oldImgUrl) {
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
