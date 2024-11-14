import { useSearchParams } from "react-router-dom";

function useParams() {
  const [SearchParam] = useSearchParams();
  const lat = SearchParam.get("lat");
  const lng = SearchParam.get("lng");
  return { lat, lng };
}

export default useParams;
