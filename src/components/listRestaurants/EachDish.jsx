import React, { useEffect } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import salad from "../../assets/salad.png";
import { useNavigate, useParams } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { AiOutlineMinus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantsAsync } from "../../redux/actions/RestaurantsActions";
import {
  addIngredient,
  createOrderAsync,
} from "../../redux/actions/userAction";
import { useState } from "react";
import { useForm } from "react-hook-form";

const ListRestaurants = () => {
  const { restaurant, dish } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { restaurants } = useSelector((store) => store.restaurants);
  //  const { order } = useSelector((store) => store.order);
  const [counter, setCounter] = useState(0);
  // console.log(order);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    dispatch(getRestaurantsAsync({ key: "", value: null }));
  }, []);

  const restaurantFind = restaurants?.find((rest) => rest.name === restaurant);
  //console.log(restaurantFind);
  const dishFind = restaurantFind?.dishes?.find(
    (eachDish) => eachDish.name === dish
  );
  const dishPrice = dishFind?.price.toFixed();
  //console.log(dishPrice);

  let data = [];

  const { handleSubmit, register } = useForm();
  const handleAdd = () => {
    setCounter(counter + 1);
  };

  const handleLess = () => {
    const value = counter > 0 ? counter - 1 : 0;
    setCounter(value);
  };

  //console.log(counter);
  return (
    <section className="dish-section">
      <MdArrowBackIosNew
        onClick={() => navigate(`/${restaurantFind.name}`)}
        //   className="arrow-icon"
      />
      {dishFind ? (
        <figure className="figure-dish">
          <img className="img-dish" src={dishFind.img} alt="dish" />
        </figure>
      ) : (
        <></>
      )}

      <article className="text-dish-container">
        {dishFind ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "2%",
            }}
          >
            <p className="dish-name">{dishFind.name}</p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <AiOutlineClockCircle />
              <p className="dish-time">15-20min</p>
            </div>
          </div>
        ) : (
          <></>
        )}

        <div className="dish-description">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s
        </div>
      </article>
      <article className="additional-ingredients-container">
        <p className="additional-text">Additional ingredients</p>
        <div className="check-ingredients-container">
          <div style={{ gap: "2%" }}>
            <input
              className="check-input"
              type="checkbox"
              // value="2"
              {...register("tomatoes")}
            />{" "}
            Tomatoes
          </div>
          <p>+2$</p>
        </div>

        <div className="check-ingredients-container">
          <div style={{ gap: "2%" }}>
            <input
              className="check-input"
              type="checkbox"
              //  value="1"
              {...register("grain")}
            />{" "}
            Grain
          </div>
          <p>+1$</p>
        </div>

        <div className="check-ingredients-container">
          <div style={{ gap: "2%" }}>
            <input
              className="check-input"
              type="checkbox"
              //  value="1"
              {...register("lettuce")}
            />{" "}
            Lettuce leaf
          </div>
          <p className="percent">+1$</p>
        </div>
      </article>
      <form>
        <footer className="footer-dish">
          <div className="counter-container">
            <IoIosAdd onClick={handleAdd} />
            <span>{counter}</span>
            <AiOutlineMinus onClick={handleLess} />
          </div>
          <div className="prices-container">
            <button type="submit" className="add-button">
              Add
            </button>
            <span>4.78</span>
          </div>
        </footer>
      </form>
    </section>
  );
};

export default ListRestaurants;
