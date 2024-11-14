import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import { UseCities } from "../context/CitiesContext";
function CityList() {
  const { cities, isloading } = UseCities();
  if (isloading) return <Spinner />;
  return (
    <div className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </div>
  );
}

export default CityList;
