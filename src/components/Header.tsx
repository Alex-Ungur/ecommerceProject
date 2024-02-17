import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { logout } from "../firebase/auth";
import { useCartStore } from "../stores/cart";

const Header = () => {
  const { count } = useCartStore();
  const { currentUser, loading } = useAuth();
  const [user, setUser] = useState(currentUser || null);

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  return (
    <header className="p-[1rem] flex items-center gap-2">
      <Link to={"/"} className="mr-auto">
        Logo
      </Link>
      <div className="">
        <Link to={"/cart"}>
          Panier {count() !== 0 && <span>{count()}</span>}
        </Link>
      </div>
      {user ? (
        <>
          <Link to={"/admin"}>Admin</Link>
          <p>{user.email}</p>
          <button onClick={handleLogout}>Déconnexion</button>
        </>
      ) : (
        <Link to={"/login"}>Connexion</Link>
      )}
    </header>
  );
};

export default Header;
