// GoogleMapView.js
import React, { useState } from 'react';
import { GoogleMap, MarkerF, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import busCoordinates from './busCoordinates'; // Adjust the path if necessary
import StaffInfoTable from './StaffInfoTable';

const containerStyle = {
  width: '1000px',
  height: '500px',
  margin: 'auto',
  border: '2px solid #333',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const center = {
  lat: 19.299529851751686,
  lng: 72.84260024561432,
};

const GoogleMapView = () => {
  const [selectedBus, setSelectedBus] = useState(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyAQT1rdtqz5DnuDucFY1qUXg7Sl7Pp6660',
    libraries: ['places'],
  });

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
      >
        {busCoordinates.map((bus, index) => {
          const [lng, lat] = bus.device_location.geometry.coordinates;
          const { name, registrationNumber, device_id, deviceType, chassisNumber, trackingCode } = bus.device_details;
          const { properties } = bus.device_location;
          const { gpsTime, gprsTime, altitude, heading, speedKph, address, odometer, gpsSignal, stateOfCharge } = properties;

          return (
            <MarkerF
              key={index}
              position={{ lat, lng }}
              onClick={() => setSelectedBus(bus)}
              icon={{
                url: 'https://cdn-icons-png.flaticon.com/128/149/149983.png',
                scaledSize: new window.google.maps.Size(25, 41),
              }}
            />
          );
        })}

        {selectedBus && (
          <InfoWindow
            position={{
              lat: selectedBus.device_location.geometry.coordinates[1],
              lng: selectedBus.device_location.geometry.coordinates[0],
            }}
            onCloseClick={() => setSelectedBus(null)}
          >
            <div>
              <strong>Name:</strong> {selectedBus.device_details.name} <br />
              <strong>Registration Number:</strong> {selectedBus.device_details.registrationNumber} <br />
              <strong>Device ID:</strong> {selectedBus.device_details.device_id} <br />
              <strong>Chassis Number:</strong> {selectedBus.device_details.chassisNumber} <br />
              <strong>Tracking Code:</strong> {selectedBus.device_details.trackingCode} <br />
              <strong>Bus Type:</strong> {selectedBus.device_details.deviceType === 'E Bus' ? 'Electric Bus' : 'Normal Bus'} <br />
              <strong>Address:</strong> {selectedBus.device_location.properties.address} <br />
              <strong>GPS Time:</strong> {selectedBus.device_location.properties.gpsTime} <br />
              <strong>GPRS Time:</strong> {selectedBus.device_location.properties.gprsTime} <br />
              <strong>Altitude:</strong> {selectedBus.device_location.properties.altitude} m <br />
              <strong>Heading:</strong> {selectedBus.device_location.properties.heading}° <br />
              <strong>Speed:</strong> {selectedBus.device_location.properties.speedKph} km/h <br />
              <strong>Odometer:</strong> {selectedBus.device_location.properties.odometer} km <br />
              <strong>GPS Signal:</strong> {selectedBus.device_location.properties.gpsSignal} <br />
              <strong>State of Charge:</strong> {selectedBus.device_location.properties.stateOfCharge}% <br />
            </div>
          </InfoWindow>
        )}
      </GoogleMap>

      <StaffInfoTable />
    </div>
  );
};

export default GoogleMapView;
