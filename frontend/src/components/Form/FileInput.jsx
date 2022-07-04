import { Fragment, useState } from "react";

const FileInput = ({ setFieldValue, setSelectedImage }) => {
  const [fileErrorMsg, setFileErrorMsg] = useState(false);
  const checkFile = (file) => {
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png"
    ) {
      if (file.size <= 2000000) {
        console.log("Taille OK");
        return true;
      } else {
        setFileErrorMsg("Fichier trop volumineux (2 Mo max)");
        setSelectedImage(false);
      }
    } else {
      console.log("Type KO");
      setFileErrorMsg("Type de fichier non accepté (jpg, jpeg, png uniquement");
      setSelectedImage(false);
    }
  };

  return (
    <Fragment>
      <label htmlFor="post_image" className="btn label-file">
        Ajouter une image
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
            setFieldValue("post_image", event.currentTarget.files[0]);
            setSelectedImage(event.target.files[0]);
            setFileErrorMsg(false);
          }
        }}
      />
      {fileErrorMsg && <p className="text-danger">{fileErrorMsg}</p>}
    </Fragment>
  );
};

export default FileInput;
