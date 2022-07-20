import { useContext, useState } from "react";
import { ThumbImgContext } from "../../contexts/thumbnailImg.context";
import { useLocation } from "react-router-dom";
import { NewImgUrlContext } from "../../contexts/newImageUrl.context";
import { useFormikContext } from "formik";

const FileInput = () => {
  const [fileErrorMsg, setFileErrorMsg] = useState(false);
  const [, setSelectedImage] = useContext(ThumbImgContext);
  const [, setNewImgUrl] = useContext(NewImgUrlContext);
  const { setFieldValue } = useFormikContext();
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
      setFileErrorMsg(
        "Type de fichier non accepté (jpg, jpeg, png uniquement)"
      );
      setSelectedImage(false);
    }
  };
  const getFieldValueName = () => {
    if (pathname.includes("/profil")) {
      return "avatar";
    } else if (pathname === "/posts") return "post_image";
  };
  const fieldValueName = getFieldValueName();

  return (
    <div className="input-file-wrapper">
      <label htmlFor={`${fieldValueName}`} className="btn label-file">
        Sélectionner une image
      </label>
      <input
        id={fieldValueName}
        className="input-file-input"
        type="file"
        name={fieldValueName}
        accept=".png, .jpg, .jpeg"
        onChange={(event) => {
          const valideFile = checkFile(event.target.files[0]);
          if (valideFile === true) {
            setFileErrorMsg(false);
            setSelectedImage(event.target.files[0]);
            setFieldValue(fieldValueName, event.target.files[0]);
            setNewImgUrl(URL.createObjectURL(event.target.files[0]));
          }
        }}
      />
      {fileErrorMsg && (
        <p className="input-file-error text-danger">{fileErrorMsg}</p>
      )}
    </div>
  );
};

export default FileInput;
