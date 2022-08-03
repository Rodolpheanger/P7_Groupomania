import { Link } from "react-router-dom";
import { Avatar } from "../Avatar/Avatar";

const AllUsers = ({ users }) => {
  return (
    <div className="all-users-wrapper">
      {users.map((user) => (
        <div className="user-card" key={user.u_uid}>
          <Avatar
            avatarUrl={user.u_avatar_url}
            username={user.u_username}
            className="user-card-avatar"
          />
          <Link
            to={`/profil/${user.u_uid}`}
            className="italic bold user-card-username"
            title={`Vers le profil de ${user.u_username}`}
          >
            {user.u_username}
          </Link>
          <p className="italic user-card-role">
            {user.u_role === "admin" && "Administrateur"}
            {user.u_role === "user" && "Utilisateur"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default AllUsers;
