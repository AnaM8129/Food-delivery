import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantsAsync } from "../../redux/actions/RestaurantsActions";
import { useForm } from "react-hook-form";
import { MdFoodBank } from "react-icons/md";

const Search = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { restaurants } = useSelector((state) => state.restaurants);
  const { watch, handleSubmit, register } = useForm();
  const [dishesArray, setDishesArray] = useState([]);
  const [filterResult, setFilterResult] = useState([]);

  const array = [];
  useEffect(() => {
    dispatch(getRestaurantsAsync({ key: "", value: null }));
    restaurants?.map((restaurant) =>
      restaurant.dishes.map((dish) => {
        array.push({ ...dish, restName: restaurant.name });
      })
    );
    setDishesArray(array);
  }, [user]);

  //console.log(array);
  const searchValue = watch("search");

  const filter = dishesArray.filter((rest) =>
    rest.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <section className="big-container-search">
      <section>
        <div className="search-container">
          <BsSearch className="search-icon" />
          <form>
            <input
              className="search-input"
              type="text"
              placeholder="Search por a dish"
              {...register("search")}
            />
          </form>
        </div>
        {searchValue ? (
          filter.map((filter, index) => (
            <div key={index} className="container-search">
              <figure className="container-search__figure">
                <img className="container-search__img" src={filter.img} />
              </figure>
              <div>
                <p className="container-search__p">{filter.name}</p>
                <p className="container-search__price">${filter.price}</p>
              </div>
            </div>
          ))
        ) : (
          <section
            className="section-no-search"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <MdFoodBank className="icon-food" />
            <p className="no-search-text">Find your favorite dishes</p>
          </section>
        )}
      </section>
    </section>
  );
};

export default Search;
