import React, { useState } from 'react';
import staffInfo from './staffInfo'; // Adjust the path if necessary

const StaffInfoTable = () => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  
  // Filter state
  const [filter, setFilter] = useState("");

  // Function to handle pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = staffInfo
    .filter(staff => 
      staff.name.toLowerCase().includes(filter.toLowerCase()) || 
      staff.role.toLowerCase().includes(filter.toLowerCase())
    )
    .slice(indexOfFirstRow, indexOfLastRow);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Function to handle filter change
  const handleFilterChange = event => {
    setFilter(event.target.value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  return (
    <div style={{ margin: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>Staff Information</h2>
      
      <input
        type="text"
        placeholder="Search by name or role"
        value={filter}
        onChange={handleFilterChange}
        style={{ marginBottom: '10px', padding: '8px', width: '100%' }}
      />

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Bus</th>
            <th>Contact Number</th>
            <th>Email</th>
            <th>Device ID</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map(staff => (
            <tr key={staff.id}>
              <td>{staff.id}</td>
              <td>{staff.name}</td>
              <td>{staff.role}</td>
              <td>{staff.bus}</td>
              <td>{staff.contactNumber}</td>
              <td>{staff.email}</td>
              <td>{staff.deviceId}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '10px', textAlign: 'center' }}>
        {Array.from({ length: Math.ceil(staffInfo.filter(staff => 
          staff.name.toLowerCase().includes(filter.toLowerCase()) || 
          staff.role.toLowerCase().includes(filter.toLowerCase())
        ).length / rowsPerPage) }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            style={{
              margin: '0 5px',
              padding: '5px 10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              backgroundColor: currentPage === i + 1 ? '#ddd' : '#fff'
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StaffInfoTable;
