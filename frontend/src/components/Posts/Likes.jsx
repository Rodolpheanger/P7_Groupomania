import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { TokenContext } from "../../contexts/token.context";
import { UserUidContext } from "../../contexts/userUid.context";

const Likes = ({ postUid }) => {
  const grrr = 0;
  const like = 1;
  const mdr = 2;
  const [reload, setReload] = useState(false);
  const [grrrCount, setGrrrCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [mdrCount, setMdrCount] = useState(0);
  const [grrrSelected, setGrrrSelected] = useState(false);
  const [likeSelected, setLikeSelected] = useState(false);
  const [mdrSelected, setMdrSelected] = useState(false);
  const [likeTypeSelected, setLikeTypeSelected] = useState("");
  const [token] = useContext(TokenContext);
  const [userUid] = useContext(UserUidContext);

  // TODO : revoir le système de "likeSelected" + voir pour refresh le component au changement de type de like par l'utilisateur

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
      console.log(response.data.message);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getLikesDatas = async () => {
      const response = await axios.get(`api/likes/${postUid}`, {
        headers: {
          Authorization: `BEARER ${token}`,
        },
      });
      await response.data.forEach((like) => {
        switch (like.pl_value) {
          case 0:
            setGrrrCount((prevState) => prevState + 1);

            if (like.u_uid === userUid) {
              setGrrrSelected(true);
              // setLikeSelected(false);
              // setMdrSelected(false);
              setLikeTypeSelected("grrr");
            }

            break;
          case 1:
            setLikeCount((prevState) => prevState + 1);

            if (like.u_uid === userUid) {
              // setGrrrSelected(false);
              setLikeSelected(true);
              // setMdrSelected(false);
              setLikeTypeSelected("like");
            }

            break;
          case 2:
            setMdrCount((prevState) => prevState + 1);
            if (like.u_uid === userUid) {
              // setGrrrSelected(false);
              // setLikeSelected(false);
              setMdrSelected(true);
              setLikeTypeSelected("mdr");
            }

            break;
          default:
            return;
        }
      });
    };
    getLikesDatas();
  }, []);

  return (
    <div className="like">
      <i
        className="fa-solid fa-face-angry"
        title="Grrr"
        onClick={() => {
          submit(grrr);
        }}
      ></i>
      <p className="grrr-count">{grrrCount}</p>
      <i
        className="fa-solid fa-heart"
        title="J'aime"
        onClick={() => {
          submit(like);
        }}
      ></i>
      <p className="like-count">{likeCount}</p>
      <i
        className="fa-solid fa-face-grin-squint-tears"
        title="MDR"
        onClick={() => {
          submit(mdr);
        }}
      ></i>
      <p className="mdr-count">{mdrCount}</p>
    </div>
  );
};

export default Likes;
