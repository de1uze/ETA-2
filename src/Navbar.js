import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Home</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/signup">Sign Up</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/map">Get Location</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/route">Route ETA</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/eta">ETA Calculator</Link>
          </li>
          <li className="nav-item">
          <Link className="nav-link" to="/findbus">Find Bus</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="/googlemapview">Google Map View</Link> 
          </li>

        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
