import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import styles from './FareCalculator.module.css';
import fareData from './fareData';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const mapCenter = { lat: 19.295677, lng: 72.858452 };

const FareCalculator = () => {
  const [route, setRoute] = useState('');
  const [startStop, setStartStop] = useState('');
  const [endStop, setEndStop] = useState('');
  const [fare, setFare] = useState(null);
  const [startMarker, setStartMarker] = useState(null);
  const [endMarker, setEndMarker] = useState(null);
  const [passengerType, setPassengerType] = useState('adult');
  const [startInfoOpen, setStartInfoOpen] = useState(false);
  const [endInfoOpen, setEndInfoOpen] = useState(false);

  const handleCalculateFare = () => {
    // Initial setup
    const startStopData = fareData.stops[startStop];
    const endStopData = fareData.stops[endStop];
  
    // Check if the necessary data is available
    if (startStopData && endStopData && route && fareData.fares[startStop] && fareData.fares[startStop][endStop]) {
      let calculatedFare = fareData.fares[startStop][endStop];
  
     
      switch (passengerType) {
        case 'child':
        case 'senior':
          calculatedFare *= 0.5; // 50% discount
          break;
        case 'personWithDisability':
          calculatedFare = 0;
          break;
        case 'student':
          setFare('Fare: In development'); 
          return; 
        default:
          
          break;
      }
  
      setFare(`Fare: ₹${calculatedFare.toFixed(2)}`);
      setStartMarker(startStopData.coordinates);
      setEndMarker(endStopData.coordinates);
    } else {
      setFare('Selected stops or zones are not available for this route.');
    }
  };
  
  const handlePassengerTypeChange = (event) => {
    setPassengerType(event.target.value);
  };
  
  return (
    <div className={styles.fareCalculatorContainer}>
      <div className={styles.controlsContainer}>
        <h2>Fare Calculator</h2>

        <label className={styles.label} htmlFor="route">
          Select Route:
        </label>
        <select
          id="route"
          value={route}
          onChange={(e) => setRoute(e.target.value)}
          className={styles.select}
        >
          <option value="">Select Route</option>
          {Object.keys(fareData.routes).map((routeKey) => (
            <option key={routeKey} value={routeKey}>
              Route {routeKey}
            </option>
          ))}
        </select>

        {route && (
          <>
            <label className={styles.label} htmlFor="startStop">
              Select Start Stop:
            </label>
            <select
              id="startStop"
              value={startStop}
              onChange={(e) => setStartStop(e.target.value)}
              className={styles.select}
            >
              <option value="">Select Start Stop</option>
              {fareData.routes[route].map((stopKey) => (
                <option key={stopKey} value={stopKey}>
                  {fareData.stops[stopKey].name}
                </option>
              ))}
            </select>

            <label className={styles.label} htmlFor="endStop">
              Select End Stop:
            </label>
            <select
              id="endStop"
              value={endStop}
              onChange={(e) => setEndStop(e.target.value)}
              className={styles.select}
            >
              <option value="">Select End Stop</option>
              {fareData.routes[route].map((stopKey) => (
                <option key={stopKey} value={stopKey}>
                  {fareData.stops[stopKey].name}
                </option>
              ))}
            </select>

            <label className={styles.label} htmlFor="passengerType">
              Passenger Type:
            </label>
            <div onChange={handlePassengerTypeChange}>
            <label>
                <input type="radio" value="adult" name="passengerType" checked={passengerType === 'adult'} /> Adult
            </label>
            <label>
                <input type="radio" value="child" name="passengerType" checked={passengerType === 'child'} /> Child
            </label>
            <label>
                <input type="radio" value="senior" name="passengerType" checked={passengerType === 'senior'} /> Senior
            </label>
            <label>
                <input type="radio" value="personWithDisability" name="passengerType" checked={passengerType === 'personWithDisability'} />   Person with Disability

            </label>
            <label>
                <input type="radio" value="studentPass" name="passengerType" checked={passengerType === 'studentPass'} /> Student
            </label>
            
            </div> 
            <button onClick={handleCalculateFare} className={styles.button}>
              Calculate Fare
            </button>

            {fare && <p className={styles.fareDisplay}>{fare}</p>}
          </>
        )}
      </div>

      <LoadScript googleMapsApiKey="AIzaSyAQT1rdtqz5DnuDucFY1qUXg7Sl7Pp6660">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={mapCenter}
          zoom={13}
        >
          {startMarker && (
            <Marker position={{ lat: startMarker[0], lng: startMarker[1] }} onClick={() => setStartInfoOpen(true)}>
              {startInfoOpen && (
                <InfoWindow onCloseClick={() => setStartInfoOpen(false)}>
                  <div>{fareData.stops[startStop].name}</div>
                </InfoWindow>
              )}
            </Marker>
          )}
          {endMarker && (
            <Marker position={{ lat: endMarker[0], lng: endMarker[1] }} onClick={() => setEndInfoOpen(true)}>
              {endInfoOpen && (
                <InfoWindow onCloseClick={() => setEndInfoOpen(false)}>
                  <div>{fareData.stops[endStop].name}</div>
                </InfoWindow>
              )}
            </Marker>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default FareCalculator;
