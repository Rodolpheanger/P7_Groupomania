import axios from "axios";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Avatar } from "../components/Avatar/Avatar";
import Header from "../components/Header/Header";
import { TokenContext } from "../contexts/token.context";
import { UserUidContext } from "../contexts/userUid.context";
import { dateParser } from "../utils/date.utils";

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
  const [token] = useContext(TokenContext);
  const [userUid] = useContext(UserUidContext);

  const parsedInscriptionDate = dateParser(inscriptionDate);

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
        console.log(userDatas.data);
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
      <main>
        <h1>{username}</h1>
        <article className="profil-card">
          <Avatar
            avatarUrl={avatarUrl}
            username={username}
            className="avatar avatar-profil"
          ></Avatar>
          <button className="btn onClick">
            {avatarUrl ? "Modifier avatar" : "Ajouter avatar"}
          </button>
          <hr />
          <p>
            <bold>Email : </bold>
            {email}
          </p>
          <hr />
          <div className="profil-name-box">
            {" "}
            <p>
              <bold>Prénom : </bold>
              {firstname}
            </p>
            <p>
              <bold>Nom : </bold>
              {lastname}
            </p>
          </div>{" "}
          <hr />
          <p className="profil-bio-box">
            <bold>Bio</bold>
            <p className="profil-bio-text">{bio}</p>
          </p>
          <hr />
          <p>
            <bold>Inscrit depuis le : </bold>
            <italic>{parsedInscriptionDate}</italic>
          </p>
          <hr />
          <p>
            <bold>Rôle : </bold>
            {role}
          </p>
        </article>
      </main>
    </Fragment>
  );
};

export default Profil;
