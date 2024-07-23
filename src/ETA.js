import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const haversine = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = degToRad(lat2 - lat1);
  const dLon = degToRad(lon1 - lon2);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degToRad(lat1)) *
      Math.cos(degToRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
};

const degToRad = (deg) => deg * (Math.PI / 180);

const ETA = () => {
  const [currentLocation, setCurrentLocation] = useState({ lat: "", lon: "" });
  const [friendLocation, setFriendLocation] = useState({ lat: "", lon: "" });
  const [eta, setEta] = useState(null);
  const [etaList, setEtaList] = useState([]);
  const [speed, setSpeed] = useState(50);
  const [speedUnit, setSpeedUnit] = useState("km/h");

  const calculateETA = () => {
    if (
      !validateInput(currentLocation.lat) ||
      !validateInput(currentLocation.lon) ||
      !validateInput(friendLocation.lat) ||
      !validateInput(friendLocation.lon)
    ) {
      alert("Please enter valid latitude and longitude values.");
      return;
    }

    const distance = haversine(
      currentLocation.lat,
      currentLocation.lon,
      friendLocation.lat,
      friendLocation.lon
    );
    const time = distance / getSpeedInKilometersPerHour();
    setEta(time);
  };

  const fetchETAFromAPI = () => {
    if (
      !validateInput(currentLocation.lat) ||
      !validateInput(currentLocation.lon)
    ) {
      alert("Please enter valid latitude and longitude values.");
      return;
    }

    console.log(
      "Fetching ETA from API with current location:",
      currentLocation
    );

    axios
      .post("http://localhost:5001/eta", { currentLocation })
      .then((response) => {
        console.log("Response from API:", response.data);
        setEtaList(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the ETA!", error);
        alert("There was an error fetching the ETA. Please try again later.");
      });
  };

  const validateInput = (value) => {
    return !isNaN(parseFloat(value)) && isFinite(value);
  };

  const getSpeedInKilometersPerHour = () => {
    if (speedUnit === "km/h") {
      return speed;
    } else if (speedUnit === "mph") {
      return speed * 1.60934;
    }
  };

  return (
    <div className="container mt-5 gps-background">
      <h1 className="text-center mb-4">ETA Calculator</h1>
      <div className="row mb-4">
        <div className="col-md-6">
          <h2>Current Location</h2>
          <div className="form-group">
            <label>Latitude</label>
            <input
              type="number"
              className="form-control"
              placeholder="Latitude"
              value={currentLocation.lat}
              onChange={(e) =>
                setCurrentLocation({ ...currentLocation, lat: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Longitude</label>
            <input
              type="number"
              className="form-control"
              placeholder="Longitude"
              value={currentLocation.lon}
              onChange={(e) =>
                setCurrentLocation({ ...currentLocation, lon: e.target.value })
              }
            />
          </div>
        </div>
        <div className="col-md-6">
          <h2>Friend's Location</h2>
          <div className="form-group">
            <label>Latitude</label>
            <input
              type="number"
              className="form-control"
              placeholder="Latitude"
              value={friendLocation.lat}
              onChange={(e) =>
                setFriendLocation({ ...friendLocation, lat: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Longitude</label>
            <input
              type="number"
              className="form-control"
              placeholder="Longitude"
              value={friendLocation.lon}
              onChange={(e) =>
                setFriendLocation({ ...friendLocation, lon: e.target.value })
              }
            />
          </div>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-md-6">
          <h2>Average Speed</h2>
          <div className="form-group">
            <label>Speed</label>
            <input
              type="number"
              className="form-control"
              placeholder="Speed"
              value={speed}
              onChange={(e) => setSpeed(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Speed Unit</label>
            <select
              className="form-control"
              value={speedUnit}
              onChange={(e) => setSpeedUnit(e.target.value)}
            >
              <option value="km/h">km/h</option>
              <option value="mph">mph</option>
            </select>
          </div>
        </div>
      </div>
      <div className="text-center mb-4">
        <button className="btn btn-primary mr-2" onClick={calculateETA}>
          Calculate ETA
        </button>
        <button className="btn btn-secondary ml-2" onClick={fetchETAFromAPI}>
          Fetch ETA from API
        </button>
      </div>
      {eta !== null && (
        <h2 className="text-center">
          Estimated Time of Arrival: {eta.toFixed(2)} hours
        </h2>
      )}
      {etaList.length > 0 && (
        <div className="eta-list">
          <h2>ETAs from API:</h2>
          <ul className="list-group">
            {etaList.map((item, index) => (
              <li key={index} className="list-group-item">
                {item.friend}: {item.eta.toFixed(2)} hours
              </li>
            ))}
          </ul>
        </div>
      )}
      <footer className="text-center mt-5">
        <p>Made by Pratik</p>
      </footer>
    </div>
  );
};

export default ETA;
