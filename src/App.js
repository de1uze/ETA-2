import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './NavBar';
import SignUp from './SignUp';
import Map from './Map';
import RoutePage from './RoutePage';
import ETA from './ETA';
import FindBus from './FindBus';
import GoogleMapView from './GoogleMapView';
import FareCalculator from './FareCalculator';
import TxtToCsvConverter from './TxtToCsvConverter';




function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/map" element={<Map />} />
          <Route path="/route" element={<RoutePage />} />
          <Route path="/eta" element={<ETA />} />
          <Route path="/findbus" element={<FindBus />} /> 
          <Route path="/googlemapview" element={<GoogleMapView />} />
          <Route path="/farecalculator" element={<FareCalculator />} /> 
          <Route path="/txttocsv" element={<TxtToCsvConverter />} />

          


        </Routes>
      </div>
    </Router>
  );
}

export default App;
