import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { TokenContext } from "../../contexts/token.context";
import { UserUidContext } from "../../contexts/userUid.context";
import ServerErrorMessage from "../Form/ServerErrorMessage";

const Likes = ({ postUid }) => {
  const grrr = 0;
  const like = 1;
  const mdr = 2;
  const [refresh, setRefresh] = useState(false);
  const [grrrCount, setGrrrCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [mdrCount, setMdrCount] = useState(0);
  const [likeTypeSelected, setLikeTypeSelected] = useState("");
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const [token] = useContext(TokenContext);
  const [userUid] = useContext(UserUidContext);

  const submit = async (value) => {
    try {
      console.log(value);
      const response = await axios.post(
        `api/likes/${postUid}`,
        { value: value },
        {
          headers: {
            Authorization: `BEARER ${token}`,
          },
        }
      );
      setRefresh(!refresh);
      console.log(response.data.message);
    } catch (err) {
      console.log(err);
      setServerErrorMessage(err.response.data.message);
    }
  };

  useEffect(() => {
    const getLikesDatas = async () => {
      setGrrrCount(0);
      setMdrCount(0);
      setLikeCount(0);
      setLikeTypeSelected("");
      const response = await axios.get(`api/likes/${postUid}`, {
        headers: {
          Authorization: `BEARER ${token}`,
        },
      });
      response.data.forEach((like) => {
        switch (like.pl_value) {
          case 0:
            setGrrrCount((prevState) => prevState + 1);
            if (like.u_uid === userUid) {
              setLikeTypeSelected("grrr");
            }
            break;
          case 1:
            setLikeCount((prevState) => prevState + 1);
            if (like.u_uid === userUid) {
              setLikeTypeSelected("like");
            }
            break;
          case 2:
            setMdrCount((prevState) => prevState + 1);
            if (like.u_uid === userUid) {
              setLikeTypeSelected("mdr");
            }
            break;
          default:
            return;
        }
      });
    };
    getLikesDatas();
  }, [postUid, refresh, token, userUid]);

  return (
    <div className={`like `}>
      <i
        className={`fa-regular fa-face-angry ${
          likeTypeSelected === "grrr" && likeTypeSelected
        }`}
        title="Grrr"
        onClick={() => {
          submit(grrr);
        }}
        tabIndex={0}
      ></i>
      <p className="grrr-count">{grrrCount}</p>
      <i
        className={`fa-regular fa-heart ${
          likeTypeSelected === "like" && likeTypeSelected
        }`}
        title="J'aime"
        onClick={() => {
          submit(like);
        }}
        tabIndex={0}
      ></i>
      <p className="like-count">{likeCount}</p>
      <i
        className={`fa-regular fa-face-grin-squint-tears ${
          likeTypeSelected === "mdr" && likeTypeSelected
        }`}
        title="MDR"
        onClick={() => {
          submit(mdr);
        }}
        tabIndex={0}
      ></i>
      <p className="mdr-count">{mdrCount}</p>
      <ServerErrorMessage message={serverErrorMessage} />
    </div>
  );
};

export default Likes;
