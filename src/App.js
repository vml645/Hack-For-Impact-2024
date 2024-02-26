import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Popup from './Popup'; // Assuming this is the popup component you've created
import './App.css'; // Your CSS file for styling

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [organizations, setOrganizations] = useState([]);
  const [activeTransactions, setActiveTransactions] = useState(null);

  useEffect(() => {
    axios.get('https://hcb.hackclub.com/api/v3/organizations', {
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      setOrganizations(response.data); // Assuming the API returns an array of organizations
    })
    .catch(error => {
      console.error('Error fetching organizations:', error);
    });
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleBoxClick = (organizationId) => {
    axios.get(`https://hcb.hackclub.com/api/v3/organizations/${organizationId}/transactions`, {
      headers: { 'Accept': 'application/json' }
    })
    .then(response => {
      console.log(response.data);
      setActiveTransactions(response.data); // Assuming the API returns transactions
    })
    .catch(error => {
      console.error('Error fetching transactions:', error);
    });
  };

  const handleClosePopup = () => {
    setActiveTransactions(null);
  };

  // Filter organizations based on searchTerm
  const filteredOrganizations = organizations.filter(org =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <header>
        <h1>Hack Club Bank</h1>
        <input
          type="text"
          placeholder="Companies..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </header>
      <div className="grid-container">
        {filteredOrganizations.map((org, index) => (
          <button key={index} className="grid-item" onClick={() => handleBoxClick(org.id)}>
            <div className="org-name">{org.name}</div>
          </button>
        ))}
      </div>
      {activeTransactions && (
        <Popup transactions={activeTransactions} onClose={handleClosePopup} />
      )}
    </div>
  );
}

export default App;
