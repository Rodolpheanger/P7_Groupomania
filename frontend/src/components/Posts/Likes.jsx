import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { TokenContext } from "../../contexts/token.context";
import { UserUidContext } from "../../contexts/userUid.context";

const Likes = ({ postUid }) => {
  const grrr = 0;
  const like = 1;
  const mdr = 2;
  const [, setReload] = useState(false);
  const [grrrCount, setGrrrCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [mdrCount, setMdrCount] = useState(0);
  const [grrrSelected, setGrrrSelected] = useState(false);
  const [likeSelected, setLikeSelected] = useState(false);
  const [mdrSelected, setMdrSelected] = useState(false);
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
      console.log(response.data.message);
    } catch (err) {
      console.log(err);
    }
  };

  // const likeTypeSelected = () => {
  //   console.log(
  //     "Grrr: ",
  //     grrrSelected,
  //     " Like: ",
  //     likeSelected,
  //     " Mdr: ",
  //     mdrSelected
  //   );
  // };

  useEffect(() => {
    const getLikesDatas = async () => {
      const response = await axios.get(`api/likes/${postUid}`, {
        headers: {
          Authorization: `BEARER ${token}`,
        },
      });
      console.log(response.data);
    };
    //   await response.data.forEach((like) => {
    //     console.log(like);
    //     switch (like.pl_value) {
    //       case 0:
    //         setGrrrCount(grrrCount + 1);

    //         if (like.u_uid === userUid) {
    //           setGrrrSelected(true);
    //           setLikeSelected(false);
    //           setMdrSelected(false);
    //           likeTypeSelected();
    //         }

    //         break;
    //       case 1:
    //         setLikeCount(likeCount + 1);

    //         if (like.u_uid === userUid) {
    //           setGrrrSelected(false);
    //           setLikeSelected(true);
    //           setMdrSelected(false);
    //           likeTypeSelected();
    //         }

    //         break;
    //       case 2:
    //         setMdrCount(mdrCount + 1);
    //         if (like.u_uid === userUid) {
    //           setGrrrSelected(false);
    //           setLikeSelected(false);
    //           setMdrSelected(true);
    //           likeTypeSelected();
    //         }

    //         break;
    //       default:
    //         return;
    //     }
    // });
    // };

    getLikesDatas();
    setReload(false);
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
        className="fa-solid fa-heart like-selected"
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
