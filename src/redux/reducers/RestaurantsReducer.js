import { restaurantsTypes } from "../types/restaurantTypes";

const initialState = {
  restaurants: [],
  error: {
    state: undefined,
    message: "",
  },
};

export const restaurantsReducer = (state = initialState, action) => {
  switch (action.type) {
    case restaurantsTypes.GET_RESTAURANTS:
      return {
        ...state,
        restaurants: [...action.payload],
      };
    default:
      return state;
  }
};
