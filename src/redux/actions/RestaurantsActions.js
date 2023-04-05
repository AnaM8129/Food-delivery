import { restaurantsTypes } from "../types/restaurantTypes";
import { filterCollection } from "../../servicesFirestore/filterCollection";
import { toggleLoading } from "./loadingActions";
const collectionName = "baseDeDatos";

const getRestaurants = (data) => {
  return {
    type: restaurantsTypes.GET_RESTAURANTS,
    payload: data,
  };
};

export const getRestaurantsAsync = (data) => {
  return async (dispatch) => {
    dispatch(toggleLoading());
    try {
      const filter = await filterCollection({
        key: data.key,
        collectionName,
        value: data.value,
      });
      dispatch(getRestaurants(filter));
      dispatch(toggleLoading());
    } catch (error) {
      console.log(error);
      dispatch(getRestaurants([]));
    }
  };
};
