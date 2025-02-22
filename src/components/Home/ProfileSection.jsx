import React, { useState } from 'react';
import FilterComponent from './components/FilterComponent';
import Avatar from '../Avatar';
import { useSelector } from 'react-redux';


const ProfileSection = ({ 
  email, 
  name, 
  role, 
  gender,
  profilePicture 
}) => {
  const [filters, setFilters] = useState({
    type: 'All Types',
    category: 'All Categories',
    size: 'All Sizes',
    priceRange: 'All Prices',
    shipping: 'All Items',
    condition: 'All Conditions',
    availability: 'All Items'
  });
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const handleFilterChange = (filterName, value) => {
    setFilters({
      ...filters,
      [filterName]: value
    });
    // Send request with updated filters
    // Example: sendRequest(filters);
  };

  const handleUploadClothes = () => {
    isLoggedIn ? alert('upload') : alert('login')
  }

  return (
    <form>
      <div className="profile-section w-full max-w-xs mx-auto p-4 bg-ccWhite rounded-lg">
        <div className="flex items-center mb-6">
           <Avatar username={name} />
          <div>
            <h2 className="text-2xl font-bold mb-1">{name}</h2>
            <p className="text-gray-700 mb-1">{email}</p>
            <p className="text-gray-500">Role: {role}</p>
            <p className="text-gray-500">Gender: {gender}</p>
            <p className="text-gray-500">Joined: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
        <button 
          className="bg-blue-600 text-ccWhite py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 mb-4"
          onClick={handleUploadClothes}
        >
          Upload Clothes
        </button>
        <FilterComponent
          filters={filters}
          handleFilterChange={handleFilterChange}
        />
      </div>
    </form>
  );
};

export default ProfileSection;