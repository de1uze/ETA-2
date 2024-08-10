import React, { useState } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 0,
  lng: 0
};

const RoutePage = () => {
  const [origin, setOrigin] = useState({ lat: '', lng: '' });
  const [destination, setDestination] = useState({ lat: '', lng: '' });
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');

  const handleCalculateRoute = () => {
    if (!origin.lat || !origin.lng || !destination.lat || !destination.lng) {
      setError('Please provide valid latitude and longitude for both origin and destination.');
      return;
    }
    setError('');
  };

  return (
    <div className="container mt-5">
      <h2>Calculate Route</h2>
      <div className="row mb-4">
        <div className="col-md-6">
          <h3>Origin</h3>
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
          <h3>Destination</h3>
          <div className="form-group">
            <label>Latitude</label>
            <input 
              type="number" 
              className="form-control" 
              placeholder="Latitude" 
              value={destination.lat} 
              onChange={(e) => setDestination({ ...destination, lat: e.target.value })} 
            />
          </div>
          <div className="form-group">
            <label>Longitude</label>
            <input 
              type="number" 
              className="form-control" 
              placeholder="Longitude" 
              value={destination.lng} 
              onChange={(e) => setDestination({ ...destination, lng: e.target.value })} 
            />
          </div>
        </div>
      </div>
      <button className="btn btn-primary" onClick={handleCalculateRoute}>Calculate Route</button>
      {error && <p className="text-danger mt-3">{error}</p>}
      <LoadScript googleMapsApiKey="AIzaSyCJxWJKUpU3bcUsAUsaNeQkVnoaFgb97MY">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={2}
        >
          {origin.lat && origin.lng && destination.lat && destination.lng && (
            <DirectionsService
              options={{
                destination: new window.google.maps.LatLng(destination.lat, destination.lng),
                origin: new window.google.maps.LatLng(origin.lat, origin.lng),
                travelMode: window.google.maps.TravelMode.DRIVING
              }}
              callback={res => {
                if (res !== null) {
                  setResponse(res);
                }
              }}
            />
          )}
          {response && (
            <DirectionsRenderer
              options={{ directions: response }}
            />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default RoutePage;
