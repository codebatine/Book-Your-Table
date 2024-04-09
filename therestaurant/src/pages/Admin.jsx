import { useContext, useState } from "react";
import { createRestaurant } from "../services/blockchainService.js";
import { ShowRestaurants } from "../components/admin/ShowRestaurants.jsx";
import { ContractContext } from "../context/ContractContext.js";
import { WalletContext } from "../context/WalletContext.js";
import { ShowBookings } from "../components/admin/ShowBookings.jsx";

export const Admin = () => {
  const [newRestaurant, setNewRestaurant] = useState({ name: "" });
  const [isLoading] = useState(false);
  const { writeContract } = useContext(ContractContext);
  const { isConnected } = useContext(WalletContext);

  const handleCreateRestaurant = async (event) => {
    event.preventDefault();
    const { name } = newRestaurant;

    try {
      await createRestaurant(name, writeContract);
      alert("Restaurant created successfully");
    } catch (error) {
      console.error("Failed to create restaurant:", error);
    }
  };

  const handleInputChange = (event) => {
    setNewRestaurant({
      ...newRestaurant,
      [event.target.name]: event.target.value,
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Admin</h1>
      {isConnected ? (
        <form onSubmit={handleCreateRestaurant}>
          <label>
            <input
              type="text"
              name="name"
              value={newRestaurant.name}
              onChange={handleInputChange}
              placeholder="Restaurant Name"
              required
            />
          </label>
          <button type="submit">Create Restaurant</button>
        </form>
      ) : (
        <p>Connect wallet to create a restaurant</p>
      )}

      {isConnected && <ShowRestaurants />}
      <div>
        {isConnected && (
          <ShowBookings all={true} restaurantId={newRestaurant.id} />
        )}
      </div>
    </div>
  );
};
