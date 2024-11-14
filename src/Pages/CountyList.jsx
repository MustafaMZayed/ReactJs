import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import { UseCities } from "../context/CitiesContext";
function CountryList() {
  const { isloading, cities } = UseCities();
  const Countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.county, emoji: city.emoji }];
    else return arr;
  }, []);
  console.log(Countries);
  if (isloading) return <Spinner />;

  return (
    <div className={styles.countryList}>
      {cities.map((countries) => (
        <CountryItem country={countries} key={crypto.randomUUID()} />
      ))}
    </div>
  );
}

export default CountryList;
