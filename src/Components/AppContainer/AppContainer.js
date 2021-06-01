import React, { useState, useEffect } from "react";
import RestaurantList from "../RestaurantList/RestaurantList";
import SideBar from "../SideBar/SideBar";
import './AppContainer.scss';

const AppContainer = ({ restaurants }) => {

  const [allRestaurants, changeAllRestaurants] = useState([]);
  const [exclusiveRestaurants, changeExclusiveRestaurants] = useState([]);
  const [scrollPosn, changeScrollPosn] = useState(0);
  const [selectedCategory, changeSelectedCategory] = useState("popular brands");

  useEffect(() => {
    window.onscroll = () => {
      changeScrollPosn(window.pageYOffset + window.innerHeight);
    };
  }, []);

  useEffect(() => {
    const reducer = (accumulator, currentValue) =>
      currentValue.restaurantList.concat(accumulator);
    const allRestaurantsTemp = restaurants.reduce(reducer, []);
    changeAllRestaurants([...allRestaurantsTemp]);
    changeExclusiveRestaurants(
      allRestaurantsTemp.filter((restaurant) => restaurant.isExlusive)
    );
  }, [restaurants]);

  return (
    <div className="appContainer">
      <SideBar
        items={[
          ...restaurants.map(
            (restaurantsCategory) => restaurantsCategory.category
          ),
          "Only On Swiggy",
          "See All",
        ]}
        numItems={[
          ...restaurants.map(
            (restaurantsCategory) => restaurantsCategory.restaurantList.length
          ),
          exclusiveRestaurants.length,
          allRestaurants.length,
        ]}
        selectedCategory={selectedCategory}
      />
      <div>
        {restaurants.map((restaurantsCategory, key) => (
          <div
            id={restaurantsCategory.category.replace(/ /g, "").toLowerCase()}
            key={key}
          >
            <RestaurantList
              title={restaurantsCategory.category}
              restaurants={restaurantsCategory.restaurantList}
              scrollPosn={scrollPosn}
              changeSelectedCategory={changeSelectedCategory}
            />
          </div>
        ))}

        <div id={"Only On Swiggy".replace(/ /g, "").toLowerCase()}>
          <RestaurantList
            title="Only On Swiggy"
            restaurants={exclusiveRestaurants}
            scrollPosn={scrollPosn}
            changeSelectedCategory={changeSelectedCategory}
          />
        </div>
        <div id={"See All".replace(/ /g, "").toLowerCase()}>
          <RestaurantList
            title="See All"
            restaurants={allRestaurants}
            disableMore
            scrollPosn={scrollPosn}
            changeSelectedCategory={changeSelectedCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default AppContainer;
