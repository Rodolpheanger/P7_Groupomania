import * as axios from "axios";
import React, { Fragment, useContext, useEffect, useState } from "react";
import Header from "../components/Header/Header";
import { TokenContext } from "../contexts/token.context";
import { UserUidContext } from "../contexts/userUid.context";
import dateParser from "../utils/date.utils";
import ProfilAvatar from "../components/Profil/ProfilAvatar";
import ModalWrapper from "../components/Modals/ModalWrapper";
import PasswordEditionModal from "../components/Modals/PasswordEditionModal";

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
  const [displayPasswordEditionModal, setDisplayPasswordEditionModal] =
    useState(false);
  const [token] = useContext(TokenContext);
  const [userUid] = useContext(UserUidContext);

  const parsedInscriptionDate = dateParser(inscriptionDate);

  const setAvatar = () => {
    console.log("setAvatar");
  };

  const close = () => {
    setDisplayPasswordEditionModal(false);
  };

  const passwordEditionModal = displayPasswordEditionModal && (
    <ModalWrapper>
      <PasswordEditionModal close={close} />
    </ModalWrapper>
  );

  useEffect(() => {
    console.log("useEffect");
  }, []);

  useEffect(() => {
    const getUserDatas = async () => {
      try {
        const userDatas = await axios.get(`/api/users/${userUid}`, {
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
      } catch (err) {
        console.log(err);
      }
    };
    getUserDatas();
  }, [token, userUid]);

  return (
    <Fragment>
      <Header />
      {passwordEditionModal}
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
              <bold>Email : </bold>
              {email}
            </p>
            <hr />
          </section>
          <section className="profil-name-box">
            <p>
              <bold>Prénom : </bold>
              {firstname}
            </p>
            <p>
              <bold>Nom : </bold>
              {lastname}
            </p>
            <hr />
          </section>
          <section className="profil-bio-box">
            <p>
              <bold>Bio</bold>
            </p>
            <p className="profil-bio-text">{bio}</p>
            <hr />
          </section>
          <section className="profil-inscription-date-box">
            <p>
              <bold>Inscrit depuis le : </bold>
              <italic>{parsedInscriptionDate}</italic>
            </p>
            <hr />
          </section>
          <section className="profil-role-box">
            <p>
              <bold>Rôle : </bold>
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
    </Fragment>
  );
};

export default Profil;
