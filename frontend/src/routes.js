import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Users from "./pages/Users.jsx";
import Auth from "./pages/Auth";
import Profil from "./pages/Profil";
import Posts from "./pages/Posts.jsx";
import NotFound from "./pages/NotFound.jsx";
import AuthentificatedRoute from "./components/ProtectedRoutes/AuthentificatedRoute.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route element={<AuthentificatedRoute />}>
        <Route path="/profil" element={<Profil />} />
        <Route path="/profil/:uid" element={<Profil />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/admin" element={<Users />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
