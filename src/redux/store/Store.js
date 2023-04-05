import { configureStore } from "@reduxjs/toolkit";
import { loadingReducer } from "../reducers/loadingReducer";
import { ingredientsReducer, userReducer } from "../reducers/userReducer";
import { restaurantsReducer } from "../reducers/RestaurantsReducer";

const reducer = {
  user: userReducer,
  loading: loadingReducer,
  restaurants: restaurantsReducer,
  order: ingredientsReducer,
};

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
