// FindBus.js
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import busCoordinates from './busCoordinates'; 

// Remove default icon URL handling from Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Define custom icon for the bus marker
const busIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/128/1048/1048333.png', 
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function FindBus() {
  useEffect(() => {
    console.log('Bus Coordinates:', busCoordinates); 
  }, []);

  return (
    <div style={{
      height: '602px',
      width: '802px',
      margin: 'auto',
      border: '2px solid #333', // Adjust border color and thickness as needed
      borderRadius: '8px', // Optional: adds rounded corners
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' // Optional: adds a subtle shadow
    }}>

    <MapContainer
      center={[19.299529851751686, 72.84260024561432]} 
      zoom={13}
      style={{height: '600px',
        width: '800px',}}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {busCoordinates.map((bus, index) => {
        const [lng, lat] = bus.device_location.geometry.coordinates; 
        const { device_details, device_location } = bus;
        const { name, registrationNumber, device_id, deviceType, chassisNumber, trackingCode } = device_details;
        const { properties } = device_location;
        const { gpsTime, gprsTime, altitude, heading, speedKph, address, odometer, gpsSignal, stateOfCharge } = properties;

        const busType = deviceType === 'E Bus' ? 'Electric Bus' : 'Normal Bus';

        // Ensure coordinates are valid numbers
        if (typeof lat === 'number' && typeof lng === 'number') {
          return (
            <Marker key={index} position={[lat, lng]} icon={busIcon}>
              <Popup>
                <div>
                  <strong>Name:</strong> {name} <br />
                  <strong>Registration Number:</strong> {registrationNumber} <br />
                  <strong>Device ID:</strong> {device_id} <br />
                  <strong>Chassis Number:</strong> {chassisNumber} <br />
                  <strong>Tracking Code:</strong> {trackingCode} <br />
                  <strong>Bus Type:</strong> {busType} <br />
                  <strong>Address:</strong> {address} <br />
                  <strong>GPS Time:</strong> {gpsTime} <br />
                  <strong>GPRS Time:</strong> {gprsTime} <br />
                  <strong>Altitude:</strong> {altitude} m <br />
                  <strong>Heading:</strong> {heading}° <br />
                  <strong>Speed:</strong> {speedKph} km/h <br />
                  <strong>Odometer:</strong> {odometer} km <br />
                  <strong>GPS Signal:</strong> {gpsSignal} <br />
                  <strong>State of Charge:</strong> {stateOfCharge}% <br />
                </div>
              </Popup>
            </Marker>
          );
        } else {
          console.error(`Invalid coordinates for Bus ${index + 1}: Lat: ${lat}, Lng: ${lng}`);
          return null;
        }
      })}
    </MapContainer>
     </div>
  );
}

export default FindBus;
