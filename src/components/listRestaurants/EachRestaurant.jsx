import React, { useEffect, useState } from "react";
import logoRestaurant from "../../assets/logo-restaurant.png";
import restaurant from "../../assets/restaurant.png";
import dish from "../../assets/dish.png";
import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { getRestaurantsAsync } from "../../redux/actions/RestaurantsActions";
import { useDispatch, useSelector } from "react-redux";

const EachRestaurant = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { restaurants } = useSelector((store) => store.restaurants);
  const { restaurant } = useParams();
  const [data, setData] = useState([]);
  const [button1, setButton1] = useState(true);
  const [button2, setButton2] = useState(false);
  const [button3, setButton3] = useState(false);
  const buttonArray = [
    {
      title: "All",
      type: 0,
      status: true,
    },
    {
      title: "Salates",
      type: 1,
      status: false,
    },
    {
      title: "Beef",
      type: 2,
      status: false,
    },
  ];

  useEffect(() => {
    dispatch(getRestaurantsAsync({ key: "", value: null }));
  }, []);

  const restaurantFind = restaurants?.find((rest) => rest.name === restaurant);
  console.log(restaurantFind);

  const functionFilter = (type) => {
    const filterSalad = restaurantFind?.dishes.filter(
      (salad) => salad.type === type
    );
    setData(filterSalad);
    // if (type === 1) {
    //   setButton1(false);
    //   setButton3(false);
    //   setButton2(true);
    // } else if (type === 2) {
    //   setButton1(false);
    //   setButton3(true);
    //   setButton2(false);
    // } else if (type === 0) {
    //   setButton1(true);
    //   setButton3(false);
    //   setButton2(false);
    // }
    // console.log(button1);
    // console.log(button2);
    // console.log(button3);
    //console.log(buttonArray);
  };

  return (
    <section className="section-each-restaurant">
      <div className="logo-container ">
        <MdArrowBackIosNew onClick={() => navigate("/")} />
        <img
          className="image-restaurant"
          src={logoRestaurant}
          alt="logo-restaurant"
        />
      </div>

      {restaurantFind?.name ? (
        <article className="restaurant-container">
          <figure className="restaurant-container__figure">
            <img
              className="restaurant-container__img"
              src={restaurantFind.img}
              alt="restaurant"
            />
          </figure>
          <div style={{ width: "60%" }}>
            <p className="restaurant-container__name">{restaurantFind.name}</p>
            <p className="restaurant-container__text">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s
            </p>
            <div className="container-stars-time">
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
              <p className="restaurant-time">{restaurantFind.timeWork}</p>
            </div>
          </div>
        </article>
      ) : (
        <></>
      )}

      <div style={{ display: "flex", gap: "5%", marginBottom: "5%" }}>
        {buttonArray.map((button, index) => (
          <div
            key={index}
            className="carousel-div"
            onClick={() => functionFilter(button.type)}
          >
            <p className="carousel-div-text">{button.title}</p>
          </div>
        ))}
      </div>

      <div className="container-all-dishes">
        {data.length
          ? data.map((dish, index) => (
              <div
                key={index}
                className="each-dish-container"
                onClick={() => navigate(`${dish.name}`)}
              >
                <img className="each-dish-img" src={dish.img} alt="" />
                <p>{dish.name}</p>
                <p className="each-dish-price">${dish.price}</p>
              </div>
            ))
          : restaurantFind.dishes.map((dish, index) => (
              <div
                key={index}
                className="each-dish-container"
                onClick={() => navigate(`${dish.name}`)}
              >
                <img className="each-dish-img" src={dish.img} alt="" />
                <p>{dish.name}</p>
                <p className="each-dish-price">${dish.price}</p>
              </div>
            ))}
      </div>
    </section>
  );
};

export default EachRestaurant;
