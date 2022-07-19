import { useEffect, useState } from "react";

const TextArea = ({ field, form, currentCharCount, ...props }) => {
  const [charCount, setCharCount] = useState("");
  const [charCountOver, setCharCountOver] = useState(false);
  useEffect(() => {
    if (charCount > 255) setCharCountOver(true);
    else setCharCountOver(false);
  }, [charCount]);
  useEffect(() => {
    setCharCount(currentCharCount);
  }, [currentCharCount]);
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
        className="input-text-area"
        onKeyUp={(e) => {
          if (e.target.value !== "") {
            setCharCount(e.target.value.length);
          } else {
            setCharCount(0);
          }
        }}
        rows="10"
      />
      <p className={`text-area-char-count ${charCountOver && "text-danger"}`}>
        ({charCount}/255)
      </p>
    </div>
  );
};

export default TextArea;
