import { useMapEvents } from "react-leaflet";

function MapClickHandler({ onClick }) {
  useMapEvents({
    click(e) {
      onClick(e.latlng);
    },
  });
  return null;
}

export default MapClickHandler;
