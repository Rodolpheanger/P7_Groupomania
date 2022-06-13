import React, { useEffect, useState } from "react";
import ButtonClose from "../ButtonClose";

const Thumbnail = ({ image, deleteThumbnailImage, deleteImage }) => {
  const [imageUrl, setImageUrl] = useState(null);

  const close = () => {
    deleteThumbnailImage(null);
    deleteImage(null);
    setImageUrl(null);
  };

  useEffect(() => {
    if (image) {
      setImageUrl(URL.createObjectURL(image));
    }
  }, [image]);

  return (
    image &&
    imageUrl && (
      <div className="thumbnail-wrapper">
        <img src={imageUrl} alt={image.name} className="thumbnail" />
        <ButtonClose close={close} />
      </div>
    )
  );
};

export default Thumbnail;
