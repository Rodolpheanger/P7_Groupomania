import { Fragment } from "react";

const FileInput = ({ setFieldValue, setSelectedImage }) => {
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
          setFieldValue("post_image", event.currentTarget.files[0]);
          setSelectedImage(event.target.files[0]);
        }}
      />
    </Fragment>
  );
};

export default FileInput;
