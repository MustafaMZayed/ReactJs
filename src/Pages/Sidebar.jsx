import styles from "./Sidebar.module.css";
import Logo from "./Components/Logo";
import { Outlet } from "react-router";
import Appnav from "./AppNav";
function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <Appnav />
      <Outlet />

      <footer className={styles.footer}>
        <p className={styles.copyright}>
          Copyright {new Date().getFullYear()} by WorldWise
        </p>
      </footer>
    </div>
  );
}

export default Sidebar;
