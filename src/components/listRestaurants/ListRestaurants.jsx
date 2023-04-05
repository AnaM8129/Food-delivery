import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import restaurant from "../../assets/restaurant.png";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantsAsync } from "../../redux/actions/RestaurantsActions";
import Loading from "../loading/Loading";

const ListRestaurants = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { restaurants } = useSelector((store) => store.restaurants);
  const loading = useSelector((state) => state.loading);

  // console.log(restaurants);
  useEffect(() => {
    if (!restaurants.length) {
      dispatch(getRestaurantsAsync({ key: "", value: null }));
    }
  }, [restaurants]);

  return (
    <section className="list-container">
      {loading ? <Loading /> : <></>}
      {restaurants?.map((restaurant, index) => (
        <article
          key={index}
          className="restaurant-container"
          onClick={() => navigate(`${restaurant.name}`)}
        >
          <figure className="restaurant-container__figure">
            <img
              className="restaurant-container__img"
              src={restaurant.img}
              alt="restaurant"
            />
          </figure>
          <div>
            <p className="restaurant-container__name">{restaurant.name}</p>
            <div className="stars-widget">
              <input className="input" type="radio" name="rate" id="rate-5" />
              <label htmlFor="rate-5" className="fas fa-star label"></label>

              <input className="input" type="radio" name="rate" id="rate-4" />
              <label htmlFor="rate-4" className="fas fa-star label"></label>

              <input className="input" type="radio" name="rate" id="rate-3" />
              <label htmlFor="rate-3" className="fas fa-star label"></label>

              <input className="input" type="radio" name="rate" id="rate-2" />
              <label htmlFor="rate-2" className="fas fa-star label"></label>

              <input className="input" type="radio" name="rate" id="rate-1" />
              <label htmlFor="rate-1" className="fas fa-star label"></label>
            </div>
            <p className="restaurant-container__time">{restaurant.timeWork}</p>
            <p className="restaurant-container__price">
              Before you <span className="restaurant-container__span">4$</span>
            </p>
          </div>
        </article>
      ))}
    </section>
  );
};

export default ListRestaurants;
