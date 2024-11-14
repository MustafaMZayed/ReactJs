import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { json, useParams } from "react-router";
const MyContext = createContext();
function CitiesContext({ children }) {
  const BASE_URL = "http://localhost:8000";
  const [cities, setCities] = useState([]);
  const [isloading, setIsLoading] = useState(null);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
        console.log(cities);
      } catch {
        alert("error loading data");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function addCity(newcity) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newcity), // Correct the 'JSON.stringify' (capital 'J')
        headers: {
          "Content-Type": "application/json", // Correct header key format
        },
      });

      if (!res.ok) {
        throw new Error("Failed to add city"); // Handle unsuccessful requests
      }
      setCities((cities) => [...cities, newcity]);
    } catch (error) {
      console.error("Error adding city:", error); // Log the error to help debugging
      alert("Error loading data");
    } finally {
      setIsLoading(false);
    }
  }
  async function DeleteCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to Delete city"); // Handle unsuccessful requests
      }
      setCities((cities) => cities.filter((city) => city.id != id));
    } catch (error) {
      console.error("Error deleting city:", error); // Log the error to help debugging
      alert("Error loading data");
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchCurrentCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
      console.log(currentCity);
    } catch {
      alert("error loading data");
    } finally {
      setIsLoading(false);
    }
    console.log(currentCity);
  }

  return (
    <MyContext.Provider
      value={{
        cities,
        isloading,
        currentCity,
        fetchCurrentCity,
        addCity,
        DeleteCity,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export function UseCities() {
  const context = useContext(MyContext);
  if (context === undefined) throw new Error("context used out of bounds");
  return context;
}

export default CitiesContext;
