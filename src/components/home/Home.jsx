import React, { useEffect, useState } from "react";
import ubication from "../../assets/icons/ubication-icon.png";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.css";
import headerImage1 from "../../assets/header-image1.png";
import headerImage2 from "../../assets/header-image2.png";
import iconPizza from "../../assets/icons/pizza.png";
import iconburger from "../../assets/icons/burger.png";
import ListRestaurants from "../listRestaurants/ListRestaurants";
import NavBar from "../navBar/NavBar";
import { useDispatch } from "react-redux";
import { getRestaurantsAsync } from "../../redux/actions/RestaurantsActions";
import { useSelector } from "react-redux";

const Home = () => {
  const [buttonSelect, setButtonSelect] = useState({ key: "", value: null });
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getRestaurantsAsync({ key: buttonSelect.key, value: buttonSelect.v })
    );
    // console.log(buttonSelect);
  }, [buttonSelect]);

  const arrayButtons = [
    {
      title: "All",
      img: "",
      key: "type",
      value: null,
    },
    {
      title: "Fast food",
      img: iconburger,
      key: "type",
      value: 1,
    },
    {
      title: "Pizza",
      img: iconPizza,
      key: "type",
      value: 2,
    },
  ];
  return (
    <main className="main">
      <header className="header">
        <figure>
          <img src={ubication} alt="Ubication-icon" />
        </figure>
        <div>
          <p className="header__text-yellow">Deliver to</p>
          <p className="header__text">{user ? user.location : "No location"}</p>
        </div>
      </header>
      <Carousel
        className="carousel-imgs"
        centerSlidePercentage={75}
        showIndicators={false}
        centerMode
        showArrows={false}
        showThumbs={false}
        showStatus={false}
        infiniteLoop={false}
      >
        <figure className="carousel-figure">
          <img className="carousel-img" src={headerImage1} alt="image" />
        </figure>
        <figure className="carousel-figure">
          <img src={headerImage2} alt="image" />
        </figure>
      </Carousel>
      <div className="text-restaurants">Restaurants and cafes</div>
      <section className="buttons-container">
        {arrayButtons.map((button, index) => (
          <div
            key={index}
            className="carousel-div"
            onClick={() =>
              setButtonSelect({ key: button.key, v: button.value })
            }
          >
            <figure className="carousel-div-figure">
              {button.img !== "" ? (
                <img className="carousel-div-img" src={button.img} alt="icon" />
              ) : (
                <></>
              )}
            </figure>
            <p className="carousel-div-text">{button.title}</p>
          </div>
        ))}
      </section>
      {/* <Carousel
        className="carousel-divs"
        centerSlidePercentage={35}
        showIndicators={false}
        centerMode
        showArrows={false}
        showThumbs={false}
        showStatus={false}
        infiniteLoop={false}
      >
        <div className="carousel-div">
          <p className="carousel-div-text">All</p>
        </div>
        <div className="carousel-div">
          <figure className="carousel-div-figure">
            <img className="carousel-div-img" src={iconburger} alt="icon" />
          </figure>
          <p className="carousel-div-text">Fast food</p>
        </div>
        <div className="carousel-div">
          <figure>
            <img className="carousel-div-img" src={iconPizza} alt="icon" />
          </figure>
          <p className="carousel-div-text">Pizza</p>
        </div>
        <div className="carousel-div">
          <figure>
            <img className="carousel-div-img" src={iconPizza} alt="icon" />
          </figure>
          <p className="carousel-div-text">Others</p>
        </div>
      </Carousel> */}
      <ListRestaurants />
      <NavBar />
    </main>
  );
};

export default Home;
