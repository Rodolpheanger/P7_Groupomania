import ModalWrapper from "../Modals/ModalWrapper";

const Loader = () => {
  return (
    <ModalWrapper>
      <div className="loader">
        <p>Chargement en cours...</p>
        <br />
        <i className="fas fa-spinner fa-spin"></i>
      </div>
    </ModalWrapper>
  );
};

export default Loader;
