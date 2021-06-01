import React, { useEffect, useRef, useState } from "react";
import RestaurantCard from "../RestaurantCard/RestaurantCard";
import './RestaurantList.scss';

function RestaurantList({
  title,
  restaurants,
  disableMore,
  scrollPosn,
  changeSelectedCategory,
}) {
  const myRef = useRef(null);
  const [moreRest, updateMoreRest] = useState(0);
  
  useEffect(() => {
    const fromTop = myRef.current.getBoundingClientRect().top;
    const fromBottom = myRef.current.getBoundingClientRect().bottom;
    if (fromTop < 50 && fromBottom > 0) {
      changeSelectedCategory(title);
    }
  }, [title, changeSelectedCategory, scrollPosn]);
  
  useEffect(() => {
    updateMoreRest(disableMore ? restaurants.length : 5);
  }, [restaurants, disableMore]);
  
  return (
    <div className="res-container" ref={myRef}>
      <div className="category-title">{title}</div>
      <div className="restaurant-list">
        {restaurants.slice(0, moreRest).map((restaurant, key) => (
          <RestaurantCard restaurant={restaurant} key={key}/>
        ))}
        {moreRest < restaurants.length && (
          <button
            className="load-more"
            onClick={() =>
              updateMoreRest(
                moreRest + 6 > restaurants.length
                  ? restaurants.length
                  : moreRest + 6
              )
            }
          >
            + {restaurants.length - moreRest} MORE
          </button>
        )}
      </div>
    </div>
  );
}

export default RestaurantList;
