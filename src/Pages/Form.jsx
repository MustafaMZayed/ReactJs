// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import styles from "./Form.module.css";
import Button from "./Components/Button";
import { useNavigate } from "react-router";
import CitiesContext, { UseCities } from "../context/CitiesContext";
import usegeoParams from "../context/usegeoParams";
import Spinner from "./Spinner";
import Message from "./Message";
const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
const flagemojiToPNG = (flag) => {
  var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
    .map((char) => String.fromCharCode(char - 127397).toLowerCase())
    .join("");
  return (
    <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
  );
};
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const { lat, lng } = usegeoParams();
  const [isLoading, setIsLoading] = useState(false);
  const [emoji, setEmoji] = useState("");
  const { addCity } = UseCities();
  function handleclick(e) {
    e.preventDefault();
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };
    console.log("advnfvfsv", newCity);
    addCity(newCity);
  }
  useEffect(() => {
    async function fetchParams() {
      try {
        setIsLoading(true);

        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();
        if (!data.countryCode) return <Message message={"enter"} />;
        console.log(data); // Handle the fetched data here
        setCityName(data.city || data.locality || "");
        setCountry(data.country);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchParams(); // Call the async function
  }, [lat, lng]); // Include dependencies (lat, lng)
  if (isLoading) return <Spinner />;
  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={`${cityName}       `}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/*   <input
        id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />*/}
        <DatePicker selected={date} onChange={(e) => setDate(e.target.value)} />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary" onClick={(e) => handleclick(e)}>
          Next
        </Button>
        <Button
          type="back"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
