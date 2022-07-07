import axios from "axios";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Avatar } from "../components/Avatar/Avatar";
import Header from "../components/Header/Header";
import { TokenContext } from "../contexts/token.context";
import { UserUidContext } from "../contexts/userUid.context";

const Profil = () => {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [username, setUsername] = useState("");
  const [token] = useContext(TokenContext);
  const [userUid] = useContext(UserUidContext);

  useEffect(() => {
    const getUserDatas = async () => {
      try {
        const userDatas = await axios.get(`/api/users/${userUid}`, {
          headers: {
            Authorization: `BEARER ${token}`,
          },
        });
        const { u_username, u_avatar_url } = userDatas.data;
        console.log(userDatas.data);
        setAvatarUrl(u_avatar_url);
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
        </article>
      </main>
    </Fragment>
  );
};

export default Profil;
