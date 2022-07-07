import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(5);

  useEffect(() => {
    const timeLeft = () => {
      setInterval(() => {
        setCount(count - 1);
      }, 1000);
    };
    if (count > -1) {
      timeLeft();
    } else {
      navigate("/");
    }
  }, [count, navigate]);
  return (
    <div className="page-not-found">
      <h1>Ouuuuuppppss - On dirait que vous vous êtes égaré !!!</h1>
      <p className="page-not-found-redirection">
        redirection dans {count} secondes...
      </p>
    </div>
  );
};

export default NotFound;
