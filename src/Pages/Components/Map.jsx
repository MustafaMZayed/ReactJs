import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styles from "../Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { UseCities } from "../../context/CitiesContext";
import { useGeolocator } from "../../context/useGeolocator";
import usegeoParams from "../../context/usegeoParams";
import Button from "./Button";

function ChangeView({ center }) {
  const map = useMap();
  map.setView(center);
  return null;
}

function MapClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

function Map() {
  const navigate = useNavigate();
  const { lat, lng } = usegeoParams();

  const { cities } = UseCities([]);
  const [position, setPosition] = useState([40, 10]); // default position
  const { isLoading, getPosition, position: geoPosition } = useGeolocator();

  // Update position when lat/lng params are available
  useEffect(() => {
    if (lat && lng) {
      setPosition([lat, lng]); // Ensure position is an array
    }
  }, [lat, lng]);

  // Log geoPosition when it updates
  useEffect(() => {
    if (geoPosition.lat && geoPosition.lng) {
      setPosition([geoPosition.lat, geoPosition.lng]);
      navigate(`form?lat=${geoPosition.lat}&lng=${geoPosition.lng}`);
    }
  }, [geoPosition, navigate]);
  return (
    <div className={styles.mapContainer}>
      <Button
        type="position"
        onClick={() => {
          getPosition(); // Trigger geolocation on button click
        }}
      >
        Use Your Location
      </Button>

      <MapContainer
        className={styles.map}
        center={position}
        zoom={7}
        scrollWheelZoom={true}
      >
        {/* Programmatically move the map when position changes */}
        <ChangeView center={position} />
        <MapClick />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {/* Display markers for cities */}
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>{city.cityName}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
