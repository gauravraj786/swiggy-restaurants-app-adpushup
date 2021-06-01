import React, { useState } from "react";
import { getRandomImage } from "../../utils";
import "./RestaurantCard.scss";

function RestaurantCard({
  restaurant: { food_types, name, ratings, delivery_time, price_for_two },
}) {
  const foodType = food_types.reduce((acc, curr) => acc + ", " + curr);
  const [hoverClass, setHoverClass] = useState(false);
  return (
    <div
      className={`restaurant-card ${hoverClass ? "card-hover" : ''}`}
      onMouseOver={() => setHoverClass(true)}
      onMouseLeave={() => setHoverClass(false)}
    >
      <img src={getRandomImage(name)} alt="" />
      <div className="title">{name}</div>
      <div className="subtitle1">{foodType}</div>
      <div className="details">
        <span className="rating">&#9733; {ratings}</span>.
        <span className="subtitle2">{delivery_time}</span>.
        <span className="subtitle2">₹{price_for_two} for two</span>
      </div>
    </div>
  );
}

export default RestaurantCard;
