const CustomInput = ({ field, form, ...props }) => {
  return (
    <div>
      <label htmlFor={field.name}>
        {props.displayname ? props.displayname : field.name}
      </label>
      <br />
      <input {...field} type="text" id={field.name} {...props} />
    </div>
  );
};

export default CustomInput;
