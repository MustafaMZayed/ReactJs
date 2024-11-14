import Sidebar from "./Sidebar";
import Map from "../Pages/Components/Map";
import styles from "./AppLayout.module.css";
import Logo from "./Components/Logo";
import User from "./User";
function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}

export default AppLayout;
