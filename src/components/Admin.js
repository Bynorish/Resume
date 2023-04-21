import React from 'react';
import './Admin.css';

function Admin() {
  const handleResetDB = () => {
    console.log("Reset DB clicked");
    // TODO: Implement logic to reset the database
  }

  const handleRebuildDB = () => {
    console.log("Rebuild DB clicked");
    // TODO: Implement logic to rebuild the database
  }

  return (
    <div className="admin">
      <h1>Admin Dashboard</h1>
      <button onClick={handleResetDB}>Reset DB</button>
      <button onClick={handleRebuildDB}>Rebuild DB</button>
    </div>
  );
}

export default Admin;