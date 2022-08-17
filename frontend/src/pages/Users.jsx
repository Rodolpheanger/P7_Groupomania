import { Fragment, useContext, useEffect, useState } from "react";
import * as axios from "axios";
import Loader from "../components/Loader/Loader";
import Header from "../components/Header/Header";
import AllUsers from "../components/Users/AllUsers";
import { TokenContext } from "../contexts/token.context";

const Users = () => {
  const [isLoading, setIsloading] = useState(false);
  const [users, setUsers] = useState([]);
  const [token] = useContext(TokenContext);

  useEffect(() => {
    document.title = `Tous les utilisateurs de Groupomania`;
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      setIsloading(true);
      try {
        const response = await axios.get("api/users", {
          headers: {
            Authorization: `BEARER ${token}`,
          },
        });
        setUsers(response.data);
        setIsloading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, [token]);

  return (
    <Fragment>
      <Header />
      <main>
        <h1>Utilisateurs enregistrés</h1>
        {isLoading && <Loader />}
        <AllUsers users={users} />
      </main>
    </Fragment>
  );
};

export default Users;
