import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 0,
  lng: 0,
};

const Map = () => {
  const [currentLocation, setCurrentLocation] = useState(null);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">My Location</h1>
      <div className="text-center mb-4">
        <button className="btn btn-primary" onClick={getCurrentLocation}>
          Get Location
        </button>
      </div>
      <LoadScript googleMapsApiKey="AIzaSyCJxWJKUpU3bcUsAUsaNeQkVnoaFgb97MY">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={2}>
          {currentLocation && (
            <Marker
              position={currentLocation}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
              }}
            />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;
