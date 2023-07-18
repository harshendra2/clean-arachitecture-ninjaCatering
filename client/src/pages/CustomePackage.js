import React, { useState } from 'react';

const DropdownComponent = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
  
    const dropdownOptions = [
      { id: 1, label: 'Item 1' },
      { id: 2, label: 'Item 2' },
      { id: 3, label: 'Item 3' },
      { id: 4, label: 'Item 4' },
      { id: 5, label: 'Item 5' },
      { id: 6, label: 'Item 6' },
    ];
  
    const handleCheckboxChange = (event, item) => {
      if (event.target.checked) {
        setSelectedItems((prevSelectedItems) => [...prevSelectedItems, item]);
      } else {
        setSelectedItems((prevSelectedItems) => prevSelectedItems.filter((selectedItem) => selectedItem !== item));
      }
    };
  
    const handleDeleteItem = (item) => {
      setSelectedItems((prevSelectedItems) => prevSelectedItems.filter((selectedItem) => selectedItem !== item));
    };
  
    const toggleDropdown = () => {
      setShowDropdown((prevState) => !prevState);
    };
  
    return (
      <div>
        <button onClick={toggleDropdown}>Toggle Dropdown</button>
        {showDropdown && (
          <div className="dropdown-content">
            {dropdownOptions.map((option) => (
              <div key={option.id}>
                <input
                  type="checkbox"
                  id={option.id}
                  checked={selectedItems.includes(option.label)}
                  onChange={(event) => handleCheckboxChange(event, option.label)}
                />
                <label htmlFor={option.id}>{option.label}</label>
              </div>
            ))}
          </div>
        )}
  
        <div>
          <h4>Selected Items:</h4>
          {selectedItems.map((item) => (
            <div key={item}>
              {item}
              <button onClick={() => handleDeleteItem(item)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    );
};

export default DropdownComponent;
