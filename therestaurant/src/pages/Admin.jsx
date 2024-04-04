import { useEffect, useState } from 'react';
import { initializeBlockchain, createRestaurant } from '../services/blockchainService.js';
import ConnectWalletButton from '../components/ConnectWalletButton';
import { ShowRestaurants } from '../components/ShowRestaurants.jsx';

export const Admin = () => {
  const [newRestaurant, setNewRestaurant] = useState({name: ''});

  useEffect(() => {
    const initialize = async () => {
      await initializeBlockchain();
    };
  
    initialize();
  }, []);

  const handleCreateRestaurant = async (event) => {
    event.preventDefault();
    const { name } = newRestaurant;
    
    try {
      await createRestaurant(name);
      alert('Restaurant created successfully');
    } catch (error) {
      console.error('Failed to create restaurant:', error);
    }
  };

  const handleInputChange = (event) => {
    setNewRestaurant({...newRestaurant, [event.target.name]: event.target.value});
  };

  return (
    <div className="container">
      <h1>Admin</h1>
      <ConnectWalletButton />
      <form onSubmit={handleCreateRestaurant}>
        <input type="text" name="name" value={newRestaurant.name} onChange={handleInputChange} placeholder="Restaurant Name" required />
        <button type="submit">Create Restaurant</button>
      </form>
  
      <ShowRestaurants/>
    </div>
  );
};