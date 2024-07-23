import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Welcome to the App!</h1>
      <p className="text-center">Please choose a feature from the menu:</p>
      <div className="text-center">
        <Link className="btn btn-primary m-2" to="/map">
          View Map
        </Link>
        <Link className="btn btn-primary m-2" to="/route">
          Find Route
        </Link>
        <Link className="btn btn-primary m-2" to="/eta">
          Calculate ETA
        </Link>
      </div>
    </div>
  );
};

export default Home;
