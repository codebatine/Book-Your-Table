// import { useContext, useState } from "react";
// import { createRestaurant, readContract } from "../services/blockchainService.js";
// import { ShowRestaurants } from "../components/ShowRestaurants.jsx";
// import { ContractContext } from "../context/ContractContext.js";
// import { WalletContext } from "../context/WalletContext.js";
// import { ShowBookings } from "../components/ShowBookings.jsx";

// export const Admin = () => {
//   const [newRestaurant, setNewRestaurant] = useState({ name: "" });
//   const { writeContract } = useContext(ContractContext);
//   const { isConnected } = useContext(WalletContext);

//   const handleCreateRestaurant = async (event) => {
//     event.preventDefault();
//     const { name } = newRestaurant;

//     try {
//       await createRestaurant(name, writeContract);
//       alert("Restaurant created successfully");
//     } catch (error) {
//       console.error("Failed to create restaurant:", error);
//     }
//   };

//   const handleInputChange = (event) => {
//     setNewRestaurant({
//       ...newRestaurant,
//       [event.target.name]: event.target.value,
//     });
//   };

//   return (
//     <div className="container">
//       <h1>Admin</h1>
//       {isConnected ? (
//         <form onSubmit={handleCreateRestaurant}>
//           <input
//             type="text"
//             name="name"
//             value={newRestaurant.name}
//             onChange={handleInputChange}
//             placeholder="Restaurant Name"
//             required
//           />
//           <button type="submit">Create Restaurant</button>
//         </form>
//       ) : (
//         <p>Connect wallet to create a restaurant</p>
//       )}

//       {isConnected ? <ShowRestaurants /> : null}
//       <div>
//         <ShowBookings all={true} readContract={readContract} />
//       </div>
//     </div>
    
//   );
// };



import { useEffect, useState } from 'react';
import { initializeBlockchain, createRestaurant } from '../services/blockchainService.js';
import ConnectWalletButton from '../components/ConnectWalletButton.jsx';
import { ShowRestaurants } from '../components/ShowRestaurants.jsx';
import { ShowBookings } from '../components/admin/ShowBookings.jsx';

export const Admin = () => {
  const [newRestaurant, setNewRestaurant] = useState({name: ''});
  const [isLoading, setIsLoading] = useState(true);
  const [readContract, setReadContract] = useState(null);

  useEffect(() => {
    const initialize = async () => {
      const contract = await initializeBlockchain();
      setReadContract(contract);
      setIsLoading(false);
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Admin</h1>
      <ConnectWalletButton />
      <form onSubmit={handleCreateRestaurant}>
        <input type="text" name="name" value={newRestaurant.name} onChange={handleInputChange} placeholder="Restaurant Name" required />
        <button type="submit">Create Restaurant</button>
      </form>
  
      <ShowRestaurants/>

      <div>
        <ShowBookings all={true} readContract={readContract} />
      </div>
    </div>
  );
};