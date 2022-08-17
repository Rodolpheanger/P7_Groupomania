import { useContext, useEffect, useState } from "react";
import { useFormikContext } from "formik";
import { CharCountContext } from "../../contexts/charCount.context";

const TextArea = ({ field, form, currentCharCount, ...props }) => {
  const [charCountOver, setCharCountOver] = useState(false);
  const [charCount, setCharCount] = useContext(CharCountContext);
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    if (charCount > 255) setCharCountOver(true);
    else setCharCountOver(false);
  }, [charCount]);

  useEffect(() => {
    currentCharCount && setCharCount(currentCharCount);
  }, [currentCharCount, setCharCount]);
  return (
    <div className="text-area-box">
      <label htmlFor={field.name}>
        {props.displayname ? props.displayname : field.name}
      </label>
      <br />
      <textarea
        {...field}
        id={field.name}
        {...props}
        className="text-area-input"
        onChange={(e) => {
          setFieldValue(`${field.name}`, e.target.value);
          if (e.target.value !== "") {
            setCharCount(e.target.value.length);
          } else {
            setCharCount(0);
          }
        }}
      />
      <p className={`text-area-char-count ${charCountOver && "text-danger"}`}>
        ({charCount}/255)
      </p>
    </div>
  );
};

export default TextArea;
