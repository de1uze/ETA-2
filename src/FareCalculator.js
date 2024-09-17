import React, { useState, useEffect } from 'react';
import fareData from './fare_data.json'; // Import the new fare data
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const FareCalculator = () => {
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState('');
  const [sourceStops, setSourceStops] = useState([]);
  const [destinationStops, setDestinationStops] = useState([]);
  const [selectedSource, setSelectedSource] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');
  const [passengerType, setPassengerType] = useState('Adult');
  const [calculatedFare, setCalculatedFare] = useState(null);
  const [sourceCoord, setSourceCoord] = useState(null);
  const [destCoord, setDestCoord] = useState(null);

  useEffect(() => {
    // Load available routes based on fare data
    const routesFromData = Array.from(new Set(fareData.map((fare) => fare.Route_Code)));
    setRoutes(routesFromData);
  }, []);

  useEffect(() => {
    if (selectedRoute) {
      // Filter stops based on the selected route
      const filteredStops = fareData.filter((fare) => fare.Route_Code === parseInt(selectedRoute));

      // Get unique stops for source and destination
      const stopsForRoute = Array.from(
        new Map(
          filteredStops.flatMap((fare) => [
            [fare.Station_1, { name: fare.Station_1, coordinates: fare.Station1_coordinates }],
            [fare.Station_2, { name: fare.Station_2, coordinates: fare.Station2_coordinates }]
          ])
        ).values()
      );

      setSourceStops(stopsForRoute);
      setDestinationStops(stopsForRoute);
    } else {
      setSourceStops([]);
      setDestinationStops([]);
    }
  }, [selectedRoute]);

  const handleRouteChange = (e) => {
    setSelectedRoute(e.target.value);
    setSelectedSource('');
    setSelectedDestination('');
    setCalculatedFare(null);
  };

  const handleSourceChange = (e) => {
    setSelectedSource(e.target.value);
    const selectedStop = sourceStops.find((stop) => stop.name === e.target.value);
    setSourceCoord(selectedStop ? selectedStop.coordinates.split(', ').map(Number) : null);
  };

  const handleDestinationChange = (e) => {
    setSelectedDestination(e.target.value);
    const selectedStop = destinationStops.find((stop) => stop.name === e.target.value);
    setDestCoord(selectedStop ? selectedStop.coordinates.split(', ').map(Number) : null);
  };

  const calculateFare = () => {
    if (!selectedRoute || !selectedSource || !selectedDestination) return;

    // Find the fare for the selected source and destination
    const fareInfo = fareData.find(
      (fare) =>
        fare.Route_Code === parseInt(selectedRoute) &&
        ((fare.Station_1 === selectedSource && fare.Station_2 === selectedDestination) ||
          (fare.Station_1 === selectedDestination && fare.Station_2 === selectedSource)) // Check in both directions
    );

    let fare = fareInfo ? fareInfo.Fare : 0;

    // Adjust fare based on passenger type
    if (passengerType === 'Child' || passengerType === 'Senior Citizen') {
      fare /= 2;
    } else if (passengerType === 'Person with Disability') {
      fare = 0;
    } else if (passengerType === 'Student Pass') {
      fare *= 0.8;
    }

    setCalculatedFare(fare);
  };

  return (
    <div>
      <h2>Fare Calculator</h2>
      <div>
        <label>Select Route: </label>
        <select value={selectedRoute} onChange={handleRouteChange}>
          <option value="">Select Route</option>
          {routes.map((route) => (
            <option key={route} value={route}>
              {`Route ${route}`}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Select Source: </label>
        <select value={selectedSource} onChange={handleSourceChange}>
          <option value="">Select Source</option>
          {sourceStops.map((stop) => (
            <option key={stop.name} value={stop.name}>
              {stop.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Select Destination: </label>
        <select value={selectedDestination} onChange={handleDestinationChange}>
          <option value="">Select Destination</option>
          {destinationStops.map((stop) => (
            <option key={stop.name} value={stop.name}>
              {stop.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Select Passenger Type: </label>
        <select value={passengerType} onChange={(e) => setPassengerType(e.target.value)}>
          <option value="Adult">Adult</option>
          <option value="Child">Child</option>
          <option value="Senior Citizen">Senior Citizen</option>
          <option value="Person with Disability">Person with Disability</option>
          <option value="Student Pass">Student Pass</option>
        </select>
      </div>
      <button onClick={calculateFare}>Get Fare</button>
      {calculatedFare !== null && <p>Calculated Fare: {calculatedFare} units</p>}

      <LoadScript googleMapsApiKey="AIzaSyAQT1rdtqz5DnuDucFY1qUXg7Sl7Pp6660">
        <GoogleMap mapContainerStyle={containerStyle} center={{ lat: 19.30717, lng: 72.84983 }} zoom={14}>
          {sourceCoord && <Marker position={{ lat: sourceCoord[0], lng: sourceCoord[1] }} label="Source" />}
          {destCoord && <Marker position={{ lat: destCoord[0], lng: destCoord[1] }} label="Destination" />}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default FareCalculator;
