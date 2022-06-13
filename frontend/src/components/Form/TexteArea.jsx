const TextArea = ({ field, form, ...props }) => {
  return (
    <div>
      <label htmlFor={field.name}>
        {props.displayname ? props.displayname : field.name}
      </label>
      <br />
      <textarea {...field} id={field.name} {...props} />
    </div>
  );
};

export default TextArea;
