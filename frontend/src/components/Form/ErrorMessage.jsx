const CustomError = (props) => {
  return (
    <div className="validation-error-message text-danger">{props.children}</div>
  );
};

export default CustomError;
