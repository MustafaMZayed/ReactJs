import { Navigate, replace, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import Navbar from "./Components/Navbar";
import styles from "./Login.module.css";
import { useState } from "react";
import Button from "./Components/Button";
export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const navigate = useNavigate();
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const { user, isAuthed, login, logout } = useAuth();
  function handelClick(e) {
    if (email && password) {
      login(email, password);
      if (isAuthed) {
        navigate("/app", { replace: true });
      }
    }
  }

  return (
    <main className={styles.login}>
      <Navbar />
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary" className="cta" onClick={handelClick}>
            Login
          </Button>
        </div>
      </form>
    </main>
  );
}
