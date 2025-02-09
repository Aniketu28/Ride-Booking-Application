// popup with timeout
import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from 'leaflet';

const LiveLocation = ({ currentLocation, address }) => {
  const carIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  // Component to adjust the map's center to the current location or pickup
  const MapCenter = () => {
    const map = useMap();
    useEffect(() => {
      if (currentLocation) {
        map.setView(currentLocation, 15); // Center the map and set zoom level
      }
    }, [currentLocation, map]);

    return null;
  };

  const markerRef = useRef(null);

  // Automatically open the popup when the map loads
  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.openPopup(); // Open the popup automatically on map load

      // Close the popup after 5 seconds (5000ms)
      const timeout = setTimeout(() => {
        if (markerRef.current) {
          markerRef.current.closePopup(); // Close the popup after the timeout
        }
      }, 5000); // 5000ms = 5 seconds

      // Cleanup function to clear the timeout if the component unmounts or location changes
      return () => clearTimeout(timeout);
    }
  }, [currentLocation]); // This will trigger whenever currentLocation is updated

  return (
    <MapContainer className="h-full w-full" center={[51.505, -0.09]} zoom={3} style={{ height: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Marker for user's live location */}
      {currentLocation && (
        <Marker
          position={currentLocation}
          icon={carIcon}
          ref={markerRef} // Attach ref to the marker
        >
          <Popup autoClose={false}>{address}</Popup>
        </Marker>
      )}

      <MapCenter />
    </MapContainer>
  );
};

export default LiveLocation;
