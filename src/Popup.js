import React, { useEffect, useRef } from 'react';
import './Popup.css'; // Ensure you have styles for the popup

const Popup = ({ transactions, onClose }) => {

  console.log(transactions); // Check the structure

  const popupRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose(); // Close the popup if the click is outside of it
      }
    };

    // Add when the component mounts
    document.addEventListener('mousedown', handleClickOutside);
    // Return function to be called when unmounted
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="popup">
      <div className="popup-content" ref={popupRef}>
        <button onClick={onClose}>Close</button>
        <ul>
          {transactions.map((transaction, index) => (
            <li key={index}>{transaction.description} - {transaction.amount}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Popup;
