import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchFilter = ({ onSearch }) => {
  const [department, setDepartment] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(department);
  };

  const handleClear = () => {
    setDepartment('');
    onSearch('');
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Filter by department..."
        className="form-input"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
      />
      <button onClick={handleSearch} className="btn" style={{ width: 'auto' }}>
        <Search size={16} /> Search
      </button>
      {department && (
        <button onClick={handleClear} className="btn btn-secondary" style={{ width: 'auto' }}>
          Clear
        </button>
      )}
    </div>
  );
};

export default SearchFilter;
