import React, { useState } from 'react';
import logo from './logo.svg'; // Assuming this is not used, but keeping it if you need it elsewhere
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const graphImages = [
    'graph1.jpg',
    'graph2.jpg',
    'graph3.jpg',
    'graph4.jpg',
    'graph5.jpg',
    'graph6.jpg',
  ];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter graphImages based on searchTerm
  const filteredImages = graphImages.filter(imageName =>
    imageName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <header>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </header>
      <div className="grid-container">
        {filteredImages.map((imageName, index) => (
          <div key={index} className="grid-item">
            <img src={`${process.env.PUBLIC_URL}/${imageName}`} alt={`Graph ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
