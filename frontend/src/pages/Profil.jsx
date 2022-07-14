import * as axios from "axios";
import React, { Fragment, useContext, useEffect, useState } from "react";
import Header from "../components/Header/Header";
import { TokenContext } from "../contexts/token.context";
import { UserUidContext } from "../contexts/userUid.context";
import dateParser from "../utils/date.utils";
import ProfilAvatar from "../components/Profil/ProfilAvatar";
import ModalWrapper from "../components/Modals/ModalWrapper";
import PasswordEditionModal from "../components/Modals/PasswordEditionModal";
import { useParams } from "react-router-dom";
import { ThumbImgContext } from "../contexts/thumbnailImg.context.jsx";
import { OldImgUrlContext } from "../contexts/oldImgUrl.context.jsx";
import AvatarEditionModal from "../components/Modals/AvatarEditionModal";
import { NewImgUrlContext } from "../contexts/newImageUrl.context";

const Profil = () => {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [inscriptionDate, setInscriptionDate] = useState("");
  const [lastname, setLastname] = useState("");
  const [role, setRole] = useState("");
  const [uid, setUid] = useState("");
  const [username, setUsername] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [oldImgUrl, setOldImgUrl] = useState("");
  const [newImgUrl, setNewImgUrl] = useState("");
  const [displayPasswordEditionModal, setDisplayPasswordEditionModal] =
    useState(false);
  const [displayAvatarEditionModal, setDisplayAvatarEditionModal] =
    useState(false);
  const [token] = useContext(TokenContext);
  const [userUid] = useContext(UserUidContext);

  const params = useParams();
  const paramsUserUid = params.uid;

  const parsedInscriptionDate = dateParser(inscriptionDate);

  let userProfilUid;
  paramsUserUid ? (userProfilUid = paramsUserUid) : (userProfilUid = userUid);

  const setAvatar = () => {
    setDisplayAvatarEditionModal(true);
  };

  const closePasswordEditionModal = () => {
    setDisplayPasswordEditionModal(false);
  };

  const closeAvatarEditionModal = () => {
    console.log("closeAvatar: ", newImgUrl);
    setAvatarUrl(newImgUrl);
    setDisplayAvatarEditionModal(false);
    console.log("closeAvatar: ", oldImgUrl);
  };

  const passwordEditionModal = displayPasswordEditionModal && (
    <ModalWrapper>
      <PasswordEditionModal close={closePasswordEditionModal} />
    </ModalWrapper>
  );
  const avatarEditionModal = displayAvatarEditionModal && (
    <ModalWrapper>
      <AvatarEditionModal
        avatarOwnerUid={uid}
        close={closeAvatarEditionModal}
      />
    </ModalWrapper>
  );
  useEffect(() => {
    console.log("useEffect: Profil");
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
      } catch (err) {
        console.log(err);
      }
    };
    getUserDatas();
  }, [setOldImgUrl, token, userProfilUid]);

  return (
    <Fragment>
      <Header />
      <ThumbImgContext.Provider value={[selectedImage, setSelectedImage]}>
        <OldImgUrlContext.Provider value={[oldImgUrl, setOldImgUrl]}>
          <NewImgUrlContext.Provider value={[newImgUrl, setNewImgUrl]}>
            {passwordEditionModal}
            {avatarEditionModal}
            <main>
              <h1>{username}</h1>
              <article className="profil-card">
                <ProfilAvatar
                  avatarUrl={avatarUrl}
                  username={username}
                  uid={uid}
                  setAvatar={setAvatar}
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
                    <button className="btn profil-edit-btn">
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
              </article>
            </main>
          </NewImgUrlContext.Provider>
        </OldImgUrlContext.Provider>
      </ThumbImgContext.Provider>
    </Fragment>
  );
};

export default Profil;
