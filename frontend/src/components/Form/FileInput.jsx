import { useContext, useState } from "react";
import { ThumbImgContext } from "../../contexts/thumbnailImg.context";
import { useLocation } from "react-router-dom";
import { NewImgUrlContext } from "../../contexts/newImageUrl.context";

const FileInput = ({ setFieldValue, inputName }) => {
  const [fileErrorMsg, setFileErrorMsg] = useState(false);
  const [, setSelectedImage] = useContext(ThumbImgContext);
  const [, setNewImgUrl] = useContext(NewImgUrlContext);
  const location = useLocation();
  const { pathname } = location;
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

  const setFieldValueFile = (event) => {
    if (pathname === "/profil") {
      setFieldValue("avatar", event.target.files[0]);
    } else if (pathname === "/posts") {
      setFieldValue("post_image", event.target.files[0]);
    }
  };

  // ??? on peut pas mettre ce putain de paramètre en dynamique pour "setFieldValue ????
  // TODO voir pour faire un autre input pour la modification d'avatar

  return (
    <div className="input-file-wrapper">
      <label htmlFor={`${inputName}`} className="btn label-file">
        Sélectionner une image
      </label>
      <input
        id={inputName}
        className="input-file-input"
        type="file"
        name={inputName}
        accept=".png, .jpg, .jpeg"
        onChange={(event) => {
          const valideFile = checkFile(event.target.files[0]);
          if (valideFile === true) {
            setFileErrorMsg(false);
            setSelectedImage(event.target.files[0]);
            setFieldValueFile(event);
            setNewImgUrl(URL.createObjectURL(event.target.files[0]));
          }
        }}
      />
      {fileErrorMsg && <p className="text-danger">{fileErrorMsg}</p>}
    </div>
  );
};

export default FileInput;
