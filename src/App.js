import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import SignUp from "./SignUp";
import Home from "./Home";
import Map from "./Map";
import RoutePage from "./Route";
import ETA from "./ETA";

const App = () => {
  return (
    <Router>
      <div className="container mt-5">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">
            Home
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/signup">
                  Sign Up
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/map">
                  Map
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/route">
                  Route
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/eta">
                  ETA
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/map" element={<Map />} />
          <Route path="/route" element={<RoutePage />} />
          <Route path="/eta" element={<ETA />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
