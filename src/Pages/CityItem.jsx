import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { UseCities } from "../context/CitiesContext";
function CityItem({ city }) {
  console.log(city);
  const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    }).format(new Date(date));
  const { currentCity, setPosition, DeleteCity } = UseCities();
  const { cityName, emoji, date, id, position } = city;
  const flagemojiToPNG = (flag) => {
    var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
      .map((char) => String.fromCharCode(char - 127397).toLowerCase())
      .join("");
    return (
      <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
    );
  };
  function Handleclick(e) {
    e.preventDefault();
    DeleteCity(id);
  }

  return (
    <div>
      {!city ? (
        <h2>Enter Your first City</h2>
      ) : (
        <li>
          <Link
            className={`${styles.cityItem} ${
              currentCity.id == id ? styles["cityItem--active"] : ""
            }`}
            to={`${id}?lat=${position.lat}&lng=${position.lng}`}
          >
            <span className={styles.emoji}>{flagemojiToPNG(emoji)}</span>
            <h2 className={styles.name}>{cityName}</h2>
            <time className={styles.date}>{formatDate(date)}</time>
            <button className={styles.deleteBtn} onClick={Handleclick}>
              &times;
            </button>
          </Link>
        </li>
      )}
    </div>
  );
}

export default CityItem;
