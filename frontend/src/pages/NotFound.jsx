import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(5);

  useEffect(() => {
    document.title = "Page non trouvé";
  }, []);

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
    <main className="page-not-found">
      <h1 className="page-not-found-message">
        La page que vous recherchez n'existe pas !!!
      </h1>
      <p className="page-not-found-redirection">
        redirection dans {count} secondes...
      </p>
    </main>
  );
};

export default NotFound;
