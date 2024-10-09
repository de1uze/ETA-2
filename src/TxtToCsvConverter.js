import React, { useState } from 'react';
import './TxtToCsvConverter.css'; // Import the CSS file

const TxtToCsvConverter = () => {
  const [routeNumber, setRouteNumber] = useState('');
  const [direction, setDirection] = useState('U');  // U or D
  const [csvData, setCsvData] = useState('');
  const [fileContent, setFileContent] = useState('');

  const handleRouteNumberChange = (e) => {
    setRouteNumber(e.target.value);  // Update the route number state
  };

  const handleDirectionChange = (e) => {
    setDirection(e.target.value);  // Update the direction state (U or D)
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      setFileContent(event.target.result);  // Store the file content
    };

    if (file) {
      reader.readAsText(file);
    }
  };

  const handleCsvGeneration = () => {
    if (!fileContent || !routeNumber) {
      alert("Please upload a file and enter a route number.");
      return;
    }

    const lines = fileContent.split('\n');  // Split the input into lines
    let csvContent = 'ID,lat,lon,sequence\n';  // CSV header
    
    lines.forEach((line, index) => {
      if (line.trim()) {
        const json = JSON.parse(line);
        const lat = json.location.latitude;
        const lon = json.location.longitude;
        const id = routeNumber + direction;  // Use the route number and direction (U or D)
        csvContent += `${id},${lat},${lon},${index}\n`;  // Append row to CSV
      }
    });

    setCsvData(csvContent);  // Update the CSV data state
  };

  return (
    <div className="container">
      <h2>Convert Txt to CSV</h2>
      <div className="form-group">
        <label htmlFor="routeNumber">Enter Route Number: </label>
        <input
          type="text"
          id="routeNumber"
          value={routeNumber}
          onChange={handleRouteNumberChange}
          className="input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="direction">Select Direction (U/D): </label>
        <select id="direction" value={direction} onChange={handleDirectionChange} className="input">
          <option value="U">Up (U)</option>
          <option value="D">Down (D)</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="fileInput">Upload a TXT file: </label>
        <input type="file" id="fileInput" accept=".txt" onChange={handleFileUpload} className="input" />
      </div>
      <div className="button-group">
        <button onClick={handleCsvGeneration} className="button">Generate CSV</button> {/* Button to trigger CSV generation */}
        <a
            href={`data:text/csv;charset=utf-8,${encodeURIComponent(csvData)}`}
            download="output.csv"
            className="button download"
          >
            Download CSV
          </a>
      </div>
      
      {csvData && (
        <div className="csv-output">
          <h3>Generated CSV:</h3>
          <pre>{csvData}</pre> {/* Display the generated CSV */}
         
        </div>
      )}
    </div>
  );
};

export default TxtToCsvConverter;
