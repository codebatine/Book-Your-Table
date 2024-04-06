import { useContext, useState } from "react";
import { getRestaurants } from "../services/blockchainService.js";
import { ContractContext } from "../context/ContractContext.js";

export const ShowRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [showRestaurants, setShowRestaurants] = useState(false);

  const { readContract } = useContext(ContractContext);

  const handleToggleRestaurants = async (event) => {
    event.preventDefault();
    try {
      const restaurants = await getRestaurants(readContract);
      setRestaurants(restaurants);
    } catch (error) {
      console.error("Failed to fetch restaurants:", error);
    }
    setShowRestaurants(!showRestaurants);
  };

  console.log(restaurants);
  console.log(showRestaurants);

  return (
<div className="container-contact">
  <form>
    <button onClick={handleToggleRestaurants}>
      {showRestaurants ? "Hide Restaurants" : "Show Restaurants"}
    </button>
  </form>
  {showRestaurants &&
    restaurants.map((restaurant, index) => (
      <div key={index}>
        <p>
          ID: {restaurant.id.toString()}, Name: {restaurant.name}
        </p>
      </div>
    ))}
</div>
  );
};
