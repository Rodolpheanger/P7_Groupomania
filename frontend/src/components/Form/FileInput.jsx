import { Fragment, useContext, useState } from "react";
import { ThumbImgContext } from "../../contexts/thumbnailImg.context";

const FileInput = ({ setFieldValue }) => {
  const [fileErrorMsg, setFileErrorMsg] = useState(false);
  const [, setSelectedImage] = useContext(ThumbImgContext);
  const checkFile = (file) => {
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png"
    ) {
      if (file.size <= 2000000) {
        return true;
      } else {
        setFileErrorMsg("Fichier trop volumineux (2 Mo max)");
        setSelectedImage(false);
      }
    } else {
      setFileErrorMsg("Type de fichier non accepté (jpg, jpeg, png uniquement");
      setSelectedImage(false);
    }
  };

  return (
    <Fragment>
      <label htmlFor="post_image" className="btn label-file">
        Sélectionner une image
      </label>
      <input
        id="post_image"
        className="input-file"
        type="file"
        name="post_image"
        accept=".png, .jpg, .jpeg"
        onChange={(event) => {
          const valideFile = checkFile(event.target.files[0]);
          if (valideFile === true) {
            setFileErrorMsg(false);
            setSelectedImage(event.target.files[0]);
            setFieldValue("post_image", event.target.files[0]);
          }
        }}
      />
      {fileErrorMsg && <p className="text-danger">{fileErrorMsg}</p>}
    </Fragment>
  );
};

export default FileInput;
