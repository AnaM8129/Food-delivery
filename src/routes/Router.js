import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../components/login/Login";
import Home from "../components/home/Home";
import Register from "../components/register/Register";
import App from "../App.jsx";
import Search from "../components/search/Search";
import NavBar from "../components/navBar/NavBar";
import Orders from "../components/orders/Orders";
import User from "../components/user/User";
import AccountEdit from "../components/user/AccountEdit";
import EachRestaurant from "../components/listRestaurants/EachRestaurant";
import EachDish from "../components/listRestaurants/EachDish";
import SignInCode from "../components/verifyCode/SignInCode";
import Verification from "../components/verifyCode/Verification";
import Location from "../components/location/Location";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { userCollectionFunction } from "../servicesFirestore/getUsers";
import { doLogin, userRegister } from "../redux/actions/userAction";
import PrivateRouter from "./PrivateRouter";

const Router = () => {
  const dispatch = useDispatch();
  // const { isLogged } = useSelector((store) => store.user);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        userCollectionFunction(user.uid)
          .then((response) => {
            dispatch(
              userRegister(response, {
                status: false,
                message: "",
              })
            );
          })
          .catch((error) => {
            dispatch(
              userRegister({}, { status: true, message: error.message })
            );
          });
      } else {
        console.log("No está logueado");
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRouter>
              <Home />
            </PrivateRouter>
          }
        />

        <Route path="/" element={<NavBar />}>
          <Route path="search" element={<Search />} />
          <Route path="orders" element={<Orders />} />
          <Route path="user" element={<User />} />
          {/* componentes */}
        </Route>
        <Route path="/:restaurant" element={<EachRestaurant />} />
        <Route path="/:restaurant/:dish" element={<EachDish />} />
        {/* <Route path="/dish" element={<EachDish />} /> */}
        <Route path="/editAccount" element={<AccountEdit />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signInPhone" element={<SignInCode />} />
        <Route path="/enterCode" element={<Verification />} />
        <Route path="/address" element={<Location />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
