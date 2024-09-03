import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 0,
  lng: 0
};

const Map = () => {
  const [location, setLocation] = useState(null);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error(error);
          alert('Error fetching location. Please try again.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Map</h2>
      <button className="btn btn-primary mb-3" onClick={handleGetLocation}>Get Location</button>
      <LoadScript googleMapsApiKey="AIzaSyAQT1rdtqz5DnuDucFY1qUXg7Sl7Pp6660">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={location || center}
          zoom={location ? 14 : 2}
        >
          {location && <Marker position={location} />}
        </GoogleMap>
      </LoadScript>
    
    </div>
  );
};

export default Map;
