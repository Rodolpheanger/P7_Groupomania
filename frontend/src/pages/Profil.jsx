import React, { Fragment, useContext, useEffect, useState } from "react";
import * as axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import dateParser from "../utils/date.utils";
import Header from "../components/Header/Header";
import ProfilAvatar from "../components/Profil/ProfilAvatar";
import ModalWrapper from "../components/Modals/ModalWrapper";
import PasswordEditionModal from "../components/Modals/PasswordEditionModal";
import ConfirmationModal from "../components/Modals/ConfirmationModal";
import ValidationModal from "../components/Modals/ValidationModal";
import { TokenContext } from "../contexts/token.context";
import { UserUidContext } from "../contexts/userUid.context";
import { UserRoleContext } from "../contexts/userRole.context";
import { ThumbImgContext } from "../contexts/thumbnailImg.context.jsx";
import { OldImgUrlContext } from "../contexts/oldImgUrl.context.jsx";
import AvatarEditionModal from "../components/Modals/AvatarEditionModal";
import { NewImgUrlContext } from "../contexts/newImageUrl.context";
import ProfilBodyEditionModal from "../components/Modals/ProfilBodyEditionModal";
import { ReloadContext } from "../contexts/reload.context";
import Loader from "../components/Loader/Loader";
import { CharCountContext } from "../contexts/charCount.context";

const Profil = () => {
  const [isLoading, setIsloading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [inscriptionDate, setInscriptionDate] = useState("");
  const [lastname, setLastname] = useState("");
  const [role, setRole] = useState("");
  const [uid, setUid] = useState("");
  const [username, setUsername] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [oldImgUrl, setOldImgUrl] = useState("");
  const [newImgUrl, setNewImgUrl] = useState("");
  const [displayAvatarEditionModal, setDisplayAvatarEditionModal] =
    useState(false);
  const [displayProfilBodyEditionModal, setDisplayProfilBodyEditionModal] =
    useState(false);
  const [displayPasswordEditionModal, setDisplayPasswordEditionModal] =
    useState(false);
  const [displayDeleteAccountModal, setDisplayDeleteAccountModal] =
    useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const [displayDeleteValidationModal, setDisplayDeleteValidationModal] =
    useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [reload, setReload] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [token] = useContext(TokenContext);
  const [userUid] = useContext(UserUidContext);
  const [userRole] = useContext(UserRoleContext);
  const navigate = useNavigate();

  const params = useParams();
  const paramsUserUid = params.uid;

  const parsedInscriptionDate = dateParser(inscriptionDate);

  let userProfilUid;
  paramsUserUid ? (userProfilUid = paramsUserUid) : (userProfilUid = userUid);

  const closeAvatarEditionModal = () => {
    setAvatarUrl(newImgUrl);
    setDisplayAvatarEditionModal(false);
  };

  const closeProfilEditionModal = () => {
    setDisplayProfilBodyEditionModal(false);
  };

  const closePasswordEditionModal = () => {
    setDisplayPasswordEditionModal(false);
  };

  const deleteAccount = async () => {
    try {
      const response = await axios.delete(`/api/users/${userProfilUid}`, {
        headers: {
          Authorization: `BEARER ${token}`,
        },
      });
      setResponseMessage(response.data.message);
      setDisplayDeleteAccountModal(false);
      setDisplayDeleteValidationModal(true);
    } catch (err) {
      setServerErrorMessage(err.response.data.message);
    }
  };
  const closeDeleteValidationModal = () => {
    if (userRole === "admin" && userUid !== uid) {
      setDisplayDeleteValidationModal(false);
      navigate("/posts");
    } else {
      localStorage.clear();
      setDisplayDeleteValidationModal(false);
      navigate("/auth");
    }
  };

  const avatarEditionModal = displayAvatarEditionModal && (
    <ModalWrapper>
      <AvatarEditionModal
        avatarOwnerUid={uid}
        close={closeAvatarEditionModal}
      />
    </ModalWrapper>
  );

  const profilBodyEditionModal = displayProfilBodyEditionModal && (
    <ModalWrapper>
      <ProfilBodyEditionModal
        userUid={uid}
        username={username}
        email={email}
        firstname={firstname}
        lastname={lastname}
        bio={bio}
        closeProfilEditionModal={closeProfilEditionModal}
      />
    </ModalWrapper>
  );

  const passwordEditionModal = displayPasswordEditionModal && (
    <ModalWrapper>
      <PasswordEditionModal close={closePasswordEditionModal} />
    </ModalWrapper>
  );

  const deleteAccountModal = displayDeleteAccountModal && (
    <ModalWrapper>
      <ConfirmationModal
        message={
          <span>
            Attention,
            <br />
            <hr />
            vous êtes sur le point de supprimer
            {uid === userUid && " votre compte !"}
            {uid !== userUid && userRole === "admin" && ` le compte de `}
            <span className="bold italic">
              {uid !== userUid && userRole === "admin" && `${username} !`}
            </span>
            <br />
            <hr />
            Cette action n'est pas réversible et toutes
            {uid === userUid ? " vos " : userRole === "admin" && ` ses `}
            données seront définitivement supprimées, y compris les posts.
            <br />
            <hr />
            <span>Souhaitez-vous continuer ?</span>
          </span>
        }
        validate={() => deleteAccount()}
        cancel={() => setDisplayDeleteAccountModal(false)}
        serverErrorMessage={serverErrorMessage}
      />
    </ModalWrapper>
  );

  const deleteValidationModal = displayDeleteValidationModal && (
    <ModalWrapper>
      <ValidationModal
        message={responseMessage}
        close={closeDeleteValidationModal}
      ></ValidationModal>
    </ModalWrapper>
  );

  useEffect(() => {
    setIsloading(true);
    const getUserDatas = async () => {
      try {
        const userDatas = await axios.get(`/api/users/${userProfilUid}`, {
          headers: {
            Authorization: `BEARER ${token}`,
          },
        });
        const {
          u_avatar_url,
          u_bio,
          u_email,
          u_firstname,
          u_inscription_date,
          u_lastname,
          u_role,
          u_uid,
          u_username,
        } = userDatas.data;
        setAvatarUrl(u_avatar_url);
        u_bio ? setBio(u_bio) : setBio("A compléter");
        setEmail(u_email);
        u_firstname ? setFirstname(u_firstname) : setFirstname("A compléter");
        setInscriptionDate(u_inscription_date);
        u_lastname ? setLastname(u_lastname) : setLastname("A compléter");

        u_role === "admin" && setRole("Administrateur");
        u_role === "user" && setRole("Utilisateur");
        setUid(u_uid);
        setUsername(u_username);
        setOldImgUrl(u_avatar_url);
        setIsloading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getUserDatas();
  }, [token, userProfilUid, reload]);

  return (
    <Fragment>
      <Header />
      <ThumbImgContext.Provider value={[selectedImage, setSelectedImage]}>
        <OldImgUrlContext.Provider value={[oldImgUrl, setOldImgUrl]}>
          <NewImgUrlContext.Provider value={[newImgUrl, setNewImgUrl]}>
            <ReloadContext.Provider value={[reload, setReload]}>
              <CharCountContext.Provider value={[charCount, setCharCount]}>
                {avatarEditionModal}
                {profilBodyEditionModal}
                {passwordEditionModal}
                {deleteAccountModal}
                {deleteValidationModal}
                {isLoading && <Loader />}
                <main>
                  <article className="profil-card">
                    <h1>{username}</h1>
                    <ProfilAvatar
                      avatarUrl={avatarUrl}
                      username={username}
                      uid={uid}
                      setAvatar={() => setDisplayAvatarEditionModal(true)}
                    />
                    <section className="profil-email-box">
                      <p>
                        <span className="bold">Email : </span>
                        {email}
                      </p>
                      <hr />
                    </section>
                    <section className="profil-name-box">
                      <p>
                        <span className="bold">Prénom : </span>
                        {firstname}
                      </p>
                      <br />
                      <p>
                        <span className="bold">Nom : </span>
                        {lastname}
                      </p>
                      <hr />
                    </section>
                    <section className="profil-bio-box">
                      <p>
                        <span className="bold">Bio</span>
                      </p>
                      <p className="profil-bio-text">{bio}</p>
                      <hr />
                    </section>
                    <section className="profil-inscription-date-box">
                      <p>
                        <span className="bold">Inscrit depuis le : </span>
                        <span className="italic">{parsedInscriptionDate}</span>
                      </p>
                      <hr />
                    </section>
                    <section className="profil-role-box">
                      <p>
                        <span className="bold">Rôle : </span>
                        {role}
                      </p>
                    </section>
                    {uid === userUid && (
                      <Fragment>
                        <hr />
                        <button
                          className="btn profil-edit-btn"
                          onClick={() => setDisplayProfilBodyEditionModal(true)}
                        >
                          Editer votre profil
                        </button>
                      </Fragment>
                    )}
                    {uid === userUid && (
                      <Fragment>
                        <hr className="hr-big" />
                        <section className="profil-password-box">
                          <button
                            className="btn"
                            onClick={() => setDisplayPasswordEditionModal(true)}
                          >
                            Modifier votre mot de passe
                          </button>
                        </section>
                      </Fragment>
                    )}

                    {(uid === userUid || userRole === "admin") && (
                      <Fragment>
                        <section className="profil-delete-button-box">
                          <hr className="hr-big" />
                          <button
                            className="btn"
                            onClick={() => setDisplayDeleteAccountModal(true)}
                          >
                            {uid === userUid
                              ? " Supprimer votre compte"
                              : userRole === "admin" &&
                                " Supprimer le compte de l'utilisateur"}
                          </button>
                        </section>
                      </Fragment>
                    )}
                  </article>
                </main>
              </CharCountContext.Provider>
            </ReloadContext.Provider>
          </NewImgUrlContext.Provider>
        </OldImgUrlContext.Provider>
      </ThumbImgContext.Provider>
    </Fragment>
  );
};

export default Profil;
