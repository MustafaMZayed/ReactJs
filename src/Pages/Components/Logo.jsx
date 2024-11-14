import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <Link to="/" className={styles.logo}>
      <img src="/icon.png" alt="WorldWise logo" className={styles.logo} />
      <p>WorldWise</p>
    </Link>
  );
}

export default Logo;
