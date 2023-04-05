import { userTypes } from "../types/userTypes";

const initialState = {
  user: {
    uid: "",
    name: "",
    email: "",
    photo: "",
    birthday: "",
    location: "",
    phone: "",
    orders: [],
    payments: [],
    recentsSearch: [],
    type: "",
  },
  error: {
    status: undefined,
    message: "",
  },
  isLogged: false,
  total: 0,
  listIngredients: [],
};

//Los reducers siempre reciben por parámetro un state y un action
export const userReducer = (state = initialState, action) => {
  //Debemos hacer un switch para evaluar cada caso (cada tipo)
  switch (action.type) {
    case userTypes.CREATE_USER:
      return {
        ...state,
        //payload siempre necesita recibir algo, en este caso el payload será un objeto con
        //estas propiedades
        user: action.payload.user,
        error: action.payload.error,
        isLogged: true,
      };
    case userTypes.LOGIN_USER:
      return {
        ...action.payload,
      };

    case userTypes.LOGOUT_USER:
      return {
        initialState,
      };

    case userTypes.UPDATE_LOCATION:
      return {
        ...state,
        user: {
          ...state.user,
          location: action.payload,
        },
      };

    case userTypes.CREATE_ORDER:
      return {
        ...state,
        user: {
          ...state.user,
          orders: action.payload,
        },
      };
    default:
      return state;
  }
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case userTypes.ADD_INGREDIENT:
      return {
        ...state,
        user: {
          ...state.user,
          orders: [...state.orders, action.payload],
        },
      };

    default:
      return state;
  }
};
