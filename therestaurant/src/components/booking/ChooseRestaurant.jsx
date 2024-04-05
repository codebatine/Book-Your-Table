import React, { useState } from 'react'

export const ChooseRestaurant = ({readRestaurant, resturantList, setResturant}) => {

  const [restaurantInput, setRestaurantInput] = useState(false);

  const handleClick = () => {
    readRestaurant();
    setRestaurantInput(true);
  }

  const handleChange = () {
    setResturant()
  }

  return (
    <div>
      <button onClick={handleClick}>Boka bord</button>
      {restaurantInput && 
      <form onSubmit={handleChange}>
        <select>
          {resturantList.map((resturant) => <option key={resturant[0]} value={resturant[1]}>{resturant[1]}</option>)}
        </select>
        <button>Välj restaurang</button>
      </form>}
    </div>
  )
}
