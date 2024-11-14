import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import Logo from "./Logo";
function Navbar() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul className={styles.ul}>
        <li>
          <NavLink to="/pricing">price</NavLink>
        </li>
        <li>
          <NavLink to="/product">contact us</NavLink>
        </li>
        <li className="cta">
          <NavLink to="/login">Login</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
