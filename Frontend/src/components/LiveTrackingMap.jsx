// import React, { useState, useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import 'leaflet-routing-machine';
// import ReactDOMServer from 'react-dom/server';

// const CarIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="&#xF1E9"><path d="M22 12V21C22 21.5523 21.5523 22 21 22H20C19.4477 22 19 21.5523 19 21V20H5V21C5 21.5523 4.55228 22 4 22H3C2.44772 22 2 21.5523 2 21V12L4.4805 6.21216C4.79566 5.47679 5.51874 5 6.31879 5H9V3H15V5H17.6812C18.4813 5 19.2043 5.47679 19.5195 6.21216L22 12ZM4.17594 12H19.8241L17.6812 7H6.31879L4.17594 12ZM6.5 17C7.32843 17 8 16.3284 8 15.5C8 14.6716 7.32843 14 6.5 14C5.67157 14 5 14.6716 5 15.5C5 16.3284 5.67157 17 6.5 17ZM17.5 17C18.3284 17 19 16.3284 19 15.5C19 14.6716 18.3284 14 17.5 14C16.6716 14 16 14.6716 16 15.5C16 16.3284 16.6716 17 17.5 17Z"></path></svg>
// );

// const StartIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="blue"><path d="M11 5.07089C7.93431 5.5094 5.5094 7.93431 5.07089 11H7V13H5.07089C5.5094 16.0657 7.93431 18.4906 11 18.9291V17H13V18.9291C16.0657 18.4906 18.4906 16.0657 18.9291 13H17V11H18.9291C18.4906 7.93431 16.0657 5.5094 13 5.07089V7H11V5.07089ZM3.05493 11C3.51608 6.82838 6.82838 3.51608 11 3.05493V1H13V3.05493C17.1716 3.51608 20.4839 6.82838 20.9451 11H23V13H20.9451C20.4839 17.1716 17.1716 20.4839 13 20.9451V23H11V20.9451C6.82838 20.4839 3.51608 17.1716 3.05493 13H1V11H3.05493ZM15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"></path></svg>
// );

// const EndIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red"><path d="M18.364 17.364L12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13Z"></path></svg>
// );

// const carIcon = new L.DivIcon({
//   html: ReactDOMServer.renderToString(<CarIcon />),
//   iconSize: [24, 24],
//   className: 'custom-icon'
// });

// const startIcon = new L.DivIcon({
//   html: ReactDOMServer.renderToString(<StartIcon />),
//   iconSize: [25, 41],
//   className: 'custom-icon'
// });

// const endIcon = new L.DivIcon({
//   html: ReactDOMServer.renderToString(<EndIcon />),
//   iconSize: [25, 41],
//   className: 'custom-icon'
// });

// const Routing = ({ startLat, startLng, endLat, endLng }) => {
//   const map = useMap();

//   useEffect(() => {
//     if (startLat && startLng && endLat && endLng) {
//       const routingControl = L.Routing.control({
//         waypoints: [
//           L.latLng(startLat, startLng),
//           L.latLng(endLat, endLng)
//         ],
//         routeWhileDragging: true,
//         createMarker: () => null, // Disable default markers
//         show: false, // Disable the itinerary table
//         lineOptions: {
//           styles: [{ color: 'blue', weight: 6 }] // Set the color and thickness of the route
//         }
//       }).addTo(map);

//       routingControl.on('routingerror', (e) => {
//         alert('Error fetching route. Please try again later.');
//       });

//       return () => map.removeControl(routingControl);
//     }
//   }, [startLat, startLng, endLat, endLng, map]);

//   return null;
// };

// const LiveTrackingMap = ({ startLat , startLng , endLat, endLng }) => {
//   const [currentPosition, setCurrentPosition] = useState([startLat, startLng]);
//   const [hasMoved, setHasMoved] = useState(false);

//   useEffect(() => {
//     const handleSuccess = (position) => {
//       const { latitude, longitude } = position.coords;
//       setCurrentPosition([latitude, longitude]);
//       setHasMoved(true);
//     };

//     const handleError = (error) => {
//       console.error('Error getting user location:', error);
//     };

//     if (navigator.geolocation) {
//       console.error('Geolocation is not supported by this browser.');
//     }
//   }, []);

//   return (
//     <MapContainer center={currentPosition} zoom={13} style={{ height: '100%', width: '100%' }} id="map">
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       <Marker position={currentPosition} icon={carIcon} />
//       <Marker position={[startLat, startLng]} icon={startIcon} />
//       <Marker position={[endLat, endLng]} icon={endIcon} />
//       <Routing startLat={startLat} startLng={startLng} endLat={endLat} endLng={endLng} />
//       <MapUpdater currentPosition={currentPosition} startLat={startLat} startLng={startLng} endLat={endLat} endLng={endLng} />
//     </MapContainer>
//   );
// };

// const MapUpdater = ({ currentPosition, startLat, startLng, endLat, endLng }) => {
//   const map = useMap();

//   useEffect(() => {
//     if (map) {
//       map.setView(currentPosition, 2);
//       map.fitBounds([
//         [startLat, startLng],
//         [endLat, endLng],
//         currentPosition
//       ]);
//     }
//   }, [currentPosition, startLat, startLng, endLat, endLng, map]);

//   return null;
// };

// export default LiveTrackingMap;


import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import ReactDOMServer from 'react-dom/server';

const CarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="&#xF1E9">
    <path d="M22 12V21C22 21.5523 21.5523 22 21 22H20C19.4477 22 19 21.5523 19 21V20H5V21C5 21.5523 4.55228 22 4 22H3C2.44772 22 2 21.5523 2 21V12L4.4805 6.21216C4.79566 5.47679 5.51874 5 6.31879 5H9V3H15V5H17.6812C18.4813 5 19.2043 5.47679 19.5195 6.21216L22 12ZM4.17594 12H19.8241L17.6812 7H6.31879L4.17594 12ZM6.5 17C7.32843 17 8 16.3284 8 15.5C8 14.6716 7.32843 14 6.5 14C5.67157 14 5 14.6716 5 15.5C5 16.3284 5.67157 17 6.5 17ZM17.5 17C18.3284 17 19 16.3284 19 15.5C19 14.6716 18.3284 14 17.5 14C16.6716 14 16 14.6716 16 15.5C16 16.3284 16.6716 17 17.5 17Z"></path>
  </svg>
);

const StartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="blue">
    <path d="M11 5.07089C7.93431 5.5094 5.5094 7.93431 5.07089 11H7V13H5.07089C5.5094 16.0657 7.93431 18.4906 11 18.9291V17H13V18.9291C16.0657 18.4906 18.4906 16.0657 18.9291 13H17V11H18.9291C18.4906 7.93431 16.0657 5.5094 13 5.07089V7H11V5.07089ZM3.05493 11C3.51608 6.82838 6.82838 3.51608 11 3.05493V1H13V3.05493C17.1716 3.51608 20.4839 6.82838 20.9451 11H23V13H20.9451C20.4839 17.1716 17.1716 20.4839 13 20.9451V23H11V20.9451C6.82838 20.4839 3.51608 17.1716 3.05493 13H1V11H3.05493ZM15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"></path>
  </svg>
);

const EndIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red">
    <path d="M18.364 17.364L12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13Z"></path>
  </svg>
);

const carIcon = new L.DivIcon({
  html: ReactDOMServer.renderToString(<CarIcon />),
  iconSize: [24, 24],
  className: 'custom-icon'
});

const startIcon = new L.DivIcon({
  html: ReactDOMServer.renderToString(<StartIcon />),
  iconSize: [25, 41],
  className: 'custom-icon'
});

const endIcon = new L.DivIcon({
  html: ReactDOMServer.renderToString(<EndIcon />),
  iconSize: [25, 41],
  className: 'custom-icon'
});

const Routing = ({ startLat, startLng, endLat, endLng }) => {
  const map = useMap();

  useEffect(() => {
    if (startLat && startLng && endLat && endLng) {
      const routingControl = L.Routing.control({
        waypoints: [
          L.latLng(startLat, startLng),
          L.latLng(endLat, endLng)
        ],
        routeWhileDragging: true,
        createMarker: () => null, // Disable default markers
        show: false, // Disable the itinerary table
        lineOptions: {
          styles: [{ color: 'blue', weight: 6 }] // Set the color and thickness of the route
        }
      }).addTo(map);

      routingControl.on('routingerror', (e) => {
        alert('Error fetching route. Please try again later.');
      });

      return () => map.removeControl(routingControl);
    }
  }, [startLat, startLng, endLat, endLng, map]);

  return null;
};

const LiveTrackingMap = ({ startLat , startLng , endLat, endLng }) => {
  const [currentPosition, setCurrentPosition] = useState([startLat, startLng]);

  useEffect(() => {
    const handleSuccess = (position) => {
      const { latitude, longitude } = position.coords;
      setCurrentPosition([latitude, longitude]);
    };

    const handleError = (error) => {
      console.error('Error getting user location:', error);
    };

    if (navigator.geolocation) {
      const geoWatcher = navigator.geolocation.watchPosition(handleSuccess, handleError, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      });

      // Cleanup when component unmounts or when no longer tracking
      return () => navigator.geolocation.clearWatch(geoWatcher);
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  return (
    <MapContainer center={currentPosition} zoom={13} style={{ height: '100%', width: '100%' }} id="map">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={currentPosition} icon={carIcon} />
      <Marker position={[startLat, startLng]} icon={startIcon} />
      <Marker position={[endLat, endLng]} icon={endIcon} />
      <Routing startLat={startLat} startLng={startLng} endLat={endLat} endLng={endLng} />
      <MapUpdater currentPosition={currentPosition} startLat={startLat} startLng={startLng} endLat={endLat} endLng={endLng} />
    </MapContainer>
  );
};

const MapUpdater = ({ currentPosition, startLat, startLng, endLat, endLng }) => {
  const map = useMap();

  useEffect(() => {
    if (map) {
      map.setView(currentPosition, 13);
      map.fitBounds([
        [startLat, startLng],
        [endLat, endLng],
        currentPosition
      ]);
    }
  }, [currentPosition, startLat, startLng, endLat, endLng, map]);

  return null;
};

export default LiveTrackingMap;
