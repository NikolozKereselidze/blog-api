import { useNavigate } from "react-router-dom";
import styles from "../styles/Logout.module.css";
import { logout } from "../services/authService";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(navigate);
  };
  return (
    <div className={styles.logoutWrapper}>
      <button className={styles.logoutButton} onClick={handleLogout}>
        logout
      </button>
    </div>
  );
};

export default Logout;
