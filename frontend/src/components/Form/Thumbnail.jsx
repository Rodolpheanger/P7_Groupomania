import React, { Fragment, useContext, useEffect, useState } from "react";
import { OldImgUrlContext } from "../../contexts/oldImgUrl.context";
import { ThumbImgContext } from "../../contexts/thumbnailImg.context";
import ButtonClose from "../Buttons/ButtonClose";

const Thumbnail = ({ setFieldValue }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [selectedImage, setSelectedImage] = useContext(ThumbImgContext);
  const [oldImgUrl, setOldImgUrl] = useContext(OldImgUrlContext);

  const close = () => {
    setSelectedImage(null);
    setFieldValue("post_image", null);
    setImageUrl(null);
  };

  const closeOld = () => {
    setOldImgUrl(null);
    setFieldValue("post_image", null);
  };

  const newImage = selectedImage && imageUrl && (
    <div className="thumbnail-wrapper">
      <img src={imageUrl} alt={selectedImage.name} className="thumbnail" />
      <ButtonClose close={close} />
    </div>
  );

  const oldImage = oldImgUrl && (
    <div className="thumbnail-wrapper">
      <img src={oldImgUrl} alt={"Selection précédente"} className="thumbnail" />
      <ButtonClose close={closeOld} />
    </div>
  );

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  return (
    <Fragment>
      {newImage}
      {oldImage}
    </Fragment>
  );
};

export default Thumbnail;
