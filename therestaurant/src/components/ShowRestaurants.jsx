import { useEffect, useState } from 'react';
import { initializeBlockchain, getRestaurants } from '../services/blockchainService.js';

export const ShowRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [showRestaurants, setShowRestaurants] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      await initializeBlockchain();
    };
  
    initialize();
  }, []);

  const handleToggleRestaurants = async () => {
    try {
      const restaurants = await getRestaurants();
      setRestaurants(restaurants);
    } catch (error) {
      console.error('Failed to fetch restaurants:', error);
    }
    setShowRestaurants(!showRestaurants);
  };

  return (
    <div className="container">
      <button onClick={handleToggleRestaurants}>{showRestaurants ? 'Hide Restaurants' : 'Show Restaurants'}</button>
      {showRestaurants && restaurants.map((restaurant, index) => (
  <div key={index}>
    <p>ID: {restaurant.id.toString()}, Name: {restaurant.name}</p>
  </div>
))}
    </div>
  );
};