import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 0,
  lng: 0,
};

const RoutePage = () => {
  const [origin, setOrigin] = useState({ lat: "", lng: "" });
  const [destination, setDestination] = useState({ lat: "", lng: "" });
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculateRoute = () => {
    if (!origin.lat || !origin.lng || !destination.lat || !destination.lng) {
      alert("Please enter valid latitude and longitude values.");
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: new window.google.maps.LatLng(
          parseFloat(origin.lat),
          parseFloat(origin.lng)
        ),
        destination: new window.google.maps.LatLng(
          parseFloat(destination.lat),
          parseFloat(destination.lng)
        ),
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setResponse(result);
          setError(null);
        } else {
          setError(`Error fetching directions: ${status}`);
          setResponse(null);
        }
      }
    );
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Route Finder</h1>
      <div className="row mb-4">
        <div className="col-md-6">
          <h2>Origin</h2>
          <div className="form-group">
            <label>Latitude</label>
            <input
              type="number"
              className="form-control"
              placeholder="Latitude"
              value={origin.lat}
              onChange={(e) => setOrigin({ ...origin, lat: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Longitude</label>
            <input
              type="number"
              className="form-control"
              placeholder="Longitude"
              value={origin.lng}
              onChange={(e) => setOrigin({ ...origin, lng: e.target.value })}
            />
          </div>
        </div>
        <div className="col-md-6">
          <h2>Destination</h2>
          <div className="form-group">
            <label>Latitude</label>
            <input
              type="number"
              className="form-control"
              placeholder="Latitude"
              value={destination.lat}
              onChange={(e) =>
                setDestination({ ...destination, lat: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Longitude</label>
            <input
              type="number"
              className="form-control"
              placeholder="Longitude"
              value={destination.lng}
              onChange={(e) =>
                setDestination({ ...destination, lng: e.target.value })
              }
            />
          </div>
        </div>
      </div>
      <div className="text-center mb-4">
        <button className="btn btn-primary" onClick={handleCalculateRoute}>
          Calculate Route
        </button>
      </div>
      <LoadScript googleMapsApiKey="AIzaSyCJxWJKUpU3bcUsAUsaNeQkVnoaFgb97MY">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={2}>
          {response && <DirectionsRenderer directions={response} />}
        </GoogleMap>
      </LoadScript>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default RoutePage;
