import { useState } from "react";
export function useGeolocator() {
  const [isLoading, setIsLoading] = useState(false);
  const [countClicks, setCountClicks] = useState(0);
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);
  function getPosition() {
    setCountClicks((count) => count + 1);

    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }
  return { error, position, countClicks, isLoading, getPosition };
}
