import { userTypes } from "../types/userTypes";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateEmail,
  updatePassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth, dataBase } from "../../firebase/firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { toggleLoading } from "./loadingActions";
import { userCollectionFunction } from "../../servicesFirestore/getUsers";

const collectionName = "userCollection";
const userCollectionFirebase = collection(dataBase, collectionName);

//CREAR USUARIO
//Función síncrina
export const userRegister = (user, error) => {
  //La función síncrona de redux siempre retorna un objeto con dos propiedades (type y payload)
  return {
    type: userTypes.CREATE_USER,
    payload: { user, error },
  };
};

//función asíncrona
//los parametros se reciben tal cual como se nombran en este caso en el form
export const userRegisterAsync = (user) => {
  //Todas las funciones asíncronas cuando retornan algo adentro reciben el dispatch
  return async (dispatch) => {
    try {
      //Prende el loading...
      dispatch(toggleLoading());
      //Este es un método de firebase que solamente recibe email y contraseña
      const createUser = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );

      const newUser = {
        name: user.name,
        email: user.email,
        birthday: user.birthday,
        phone: user.phone,
        orders: [],
        payments: [],
        recentsSearch: [],
        type: "user",
      };
      const userDoc = await addDoc(userCollectionFirebase, newUser);
      //Debemos hacer el llamado a la función síncrona que espera un objeto (en este caso)
      dispatch(userRegister({ ...newUser }, { status: false, message: "" }));

      //Apaga el loading...
      dispatch(toggleLoading());

      console.log(newUser, "firebase");
    } catch (error) {
      console.log(error);
      dispatch(userRegister({}, { status: true, message: error.message }));
    }
  };
};

//VERIFICAR CODIGO
export const verifyCodeAsync = (code) => {
  return (dispatch) => {
    window.confirmationResult
      .confirm(code)
      .then(async (result) => {
        const user = result.user.auth.currentUser;
        const userCollection = await userCollectionFunction(user.uid);
        console.log(userCollection);
        dispatch(
          userRegister(
            {
              ...userCollection,
            },
            { status: false, message: "" }
          )
        );
      })
      .catch((error) => {
        console.log(error);
        dispatch(userRegister({}, { status: true, message: "error.message" }));
      });
  };
};

//ACTUALIZAR DATOS

export const updateProfileAsync = (user) => {
  return async (dispatch) => {
    dispatch(toggleLoading());

    try {
      console.log(user);
      const userAuth = auth.currentUser;
      await updateProfile(userAuth, {
        displayName: user.name,
        photoURL: user.photo,
        phoneNumber: user.phone,
      });
      await updatePassword(userAuth, user.password);
      await updateEmail(userAuth, user.email);

      const newUser = {
        uid: userAuth.uid,
        name: user.name,
        email: user.email,
        photo: user.photo,
        location: user.location,
        phone: userAuth.phoneNumber,
        birthday: user.birthday,
        typeUser: "user",
        orders: [],
        payments: [],
        recentsSearch: [],
      };

      console.log(newUser);

      const userDocs = await addDoc(userCollectionFirebase, newUser);
      dispatch(
        userLogin(
          { ...newUser, id: userDocs.id },
          { status: false, message: "" }
        )
      );
      dispatch(toggleLoading());
    } catch (error) {
      console.log(error);
      dispatch(userLogin({}, { status: false, message: error.message }));
    }
  };
};

//SALIR DE LA SESIÓN

const logout = () => {
  return {
    type: userTypes.LOGOUT_USER,
  };
};

export const logoutAsync = () => {
  return async (dispatch) => {
    dispatch(toggleLoading());
    try {
      await signOut(auth);
      dispatch(logout());
      dispatch(toggleLoading());
    } catch (error) {
      console.log(error);
    }
  };
};

//IGRESAR CON EMAIL Y CONTRASEÑA
//Función síncrona
const userLogin = (user) => {
  return {
    type: userTypes.LOGIN_USER,
    payload: user,
  };
};
//Función asíncrona
export const userLoginAsync = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(toggleLoading());
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const userCollection = await userCollectionFunction(user.uid);
      console.log(userCollection);
      dispatch(
        userLogin(
          {
            ...userCollection,
          },
          { status: false, message: "" }
        )
      );
      dispatch(toggleLoading());
      console.log(user);
    } catch (error) {
      console.log(error);
      dispatch(userLogin({ name: "", email: "", error: true }));
    }
  };
};

//ACTUALIZAR LOCACIÓN
const updateLocation = (data) => {
  return {
    type: userTypes.UPDATE_LOCATION,
    payload: data,
  };
};

export const updateLocationAsync = (location) => {
  return async (dispatch) => {
    const currentUser = auth.currentUser;
    let lastLocation;
    let id;

    try {
      const q = query(
        userCollectionFirebase,
        where("uid", "==", currentUser.uid)
      );
      const userDoc = await getDocs(q);
      userDoc.forEach((user) => {
        id = user.id;
        lastLocation = user.data().location;
      });
      const userRef = doc(dataBase, collectionName, id);
      await updateDoc(userRef, { location: location });
      dispatch(updateLocation(location));
    } catch (error) {
      console.log(error);
      dispatch(updateLocation(location));
    }
  };
};

//CREAR UNA ORDEN
const createOrder = (data) => {
  return {
    type: userTypes.CREATE_ORDER,
    payload: data,
  };
};

export const createOrderAsync = (order) => {
  return async (dispatch) => {
    const currentUser = auth.currentUser;
    let id;
    let array = [];

    try {
      const q = query(
        userCollectionFirebase,
        where("uid", "==", currentUser.uid)
      );
      const userDoc = await getDocs(q);
      userDoc.forEach((user) => {
        id = user.id;
        array = user.data().orders;
      });
      const newOrder = {
        date: "5/04/2023",
        dishes: [
          {
            price: order.price,
            quantity: order.quantity,
            name: order.name,
          },
        ],
        restaurantName: order.restName,
        status: "Delivered",
        total: order.total,
      };

      array = [newOrder];
      const userRef = doc(dataBase, collectionName, id);
      await updateDoc(userRef, { orders: array });
      dispatch(createOrder(newOrder));
    } catch (error) {
      console.log(error);
      dispatch(createOrder(array));
    }
  };
};
