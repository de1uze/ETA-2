import React, { useState, useEffect } from 'react';

// Haversine formula to calculate the distance between two points
const haversine = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = degToRad(lat2 - lat1);
  const dLon = degToRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in kilometers
  return d;
};

const degToRad = (deg) => deg * (Math.PI / 180);

const ETACalculator = ({ sourceCoord, destCoord, speed }) => {
  const [eta, setEta] = useState(null); // ETA in hours
  const [distance, setDistance] = useState(null); // Distance in km

  useEffect(() => {
    if (sourceCoord && destCoord && speed) {
      const [lat1, lon1] = sourceCoord;
      const [lat2, lon2] = destCoord;
      
      // Calculate the distance
      const calculatedDistance = haversine(lat1, lon1, lat2, lon2);
      setDistance(calculatedDistance);

      // Calculate ETA
      const calculatedEta = calculatedDistance / speed; // Time = Distance / Speed
      setEta(calculatedEta);
    }
  }, [sourceCoord, destCoord, speed]);

  return (
    <div>
      {distance !== null && eta !== null ? (
        <div>
          <p>Distance: {distance.toFixed(2)} km</p>
          <p>Estimated Time of Arrival (ETA): {eta.toFixed(2)} hours</p>
        </div>
      ) : (
        <p>Waiting for source, destination, and speed...</p>
      )}
    </div>
  );
};

export default ETACalculator;
