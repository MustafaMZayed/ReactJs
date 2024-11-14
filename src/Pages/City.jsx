import { Navigate, useNavigate, useParams } from "react-router";
import styles from "./City.module.css";
import Button from "./Components/Button";
import { UseCities } from "../context/CitiesContext";
import { useEffect } from "react";
import Spinner from "./Spinner";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const Navigate = useNavigate();
  const { id } = useParams();
  const { fetchCurrentCity, currentCity, isloading } = UseCities();
  console.log(id);
  // TEMP DATA
  useEffect(() => {
    fetchCurrentCity(id);
  }, [id]);
  const { cityName, emoji, date, notes } = currentCity;
  console.log(currentCity);
  if (isloading) return <Spinner />;
  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <Button
          type="back"
          onClick={(e) => {
            Navigate(-1);
          }}
        >
          Back
        </Button>
      </div>
    </div>
  );
}

export default City;
