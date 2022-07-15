import React, { Fragment, useContext, useEffect, useState } from "react";
import { NewImgUrlContext } from "../../contexts/newImageUrl.context";
import { OldImgUrlContext } from "../../contexts/oldImgUrl.context";
import { ThumbImgContext } from "../../contexts/thumbnailImg.context";
import CloseBtn from "../Buttons/CloseBtn";
import defaultAvatar from "../../styles/assets/img/icons/abstract-user-flat-4.png";
import { useFormikContext } from "formik";
import { useLocation } from "react-router-dom";

const Thumbnail = ({ className }) => {
  const [imageToDisplay, setImageToDisplay] = useState("");
  const [selectedImage, setSelectedImage] = useContext(ThumbImgContext);
  const [oldImgUrl, setOldImgUrl] = useContext(OldImgUrlContext);
  const [newImgUrl, setNewImgUrl] = useContext(NewImgUrlContext);
  const { setFieldValue, values, setFieldTouched } = useFormikContext();
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
    setFieldTouched(fieldValueName, true);
    // setValues(fieldValueName, "");
    console.log(values);
    setSelectedImage("");
    setNewImgUrl("");
    // console.log("close: ", selectedImage);
  };

  const closeOld = () => {
    setFieldValue(fieldValueName, "");
    setFieldTouched(fieldValueName, true);

    // setValues(fieldValueName, "");
    console.log(values);
    setOldImgUrl("");
    setNewImgUrl("");
    setSelectedImage("");
    console.log("closeOld: ", selectedImage);
  };

  useEffect(() => {
    if (selectedImage) {
      console.log("selectedImage", selectedImage);
      setImageToDisplay(
        <div className={`thumbnail-wrapper ${className}`}>
          <img src={newImgUrl} alt={selectedImage.name} className="thumbnail" />
          <CloseBtn close={close} />
        </div>
      );
    } else if (oldImgUrl) {
      console.log("oldImgUrl", oldImgUrl);
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
        console.log("defaultAvatar", defaultAvatar);
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
        console.log("Other case");
        setImageToDisplay("");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedImage, oldImgUrl, newImgUrl]);

  return <Fragment>{imageToDisplay}</Fragment>;
};

export default Thumbnail;
