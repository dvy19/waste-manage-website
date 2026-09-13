import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function LocationSelector({ setLocation }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;

      console.log("Latitude:", lat);
      console.log("Longitude:", lng);

      

      setLocation({
        lat,
        lng,
      });
    },
  });

  return null;
}

function MapPicker() {
  const [location, setLocation] = useState(null);

  const center = [28.6692, 77.4538];

  return (
    <MapContainer
      center={center}
      zoom={23}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LocationSelector setLocation={setLocation} />

      {location && (
        <Marker position={[location.lat, location.lng]} />
      )}
    </MapContainer>
  );
}

export default MapPicker;