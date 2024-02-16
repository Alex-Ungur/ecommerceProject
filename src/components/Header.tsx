import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
// import useUserStore from "../stores/useUserStore";
import { auth } from "../firebase/firebase-config";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { logout } from "../firebase/auth";

const Header = () => {
  // const items = useCartStore((state) => state.items);
  const quantity = useCartStore((state) => state.totalQuantity());
  const { currentUser, loading } = useAuth();
  const [user, setUser] = useState(currentUser);
  // const userData = useUserStore((state) => state.userData);

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(quantity);

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
          Panier{quantity && quantity > 0 && <span>{quantity}</span>}
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
