import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { userCollectionFunction } from "../servicesFirestore/getUsers";
import { auth } from "../firebase/firebaseConfig";
import { userRegister } from "../redux/actions/userAction";
import Home from "../components/home/Home";

const PrivateRouter = ({ children }) => {
  const dispatch = useDispatch();
  const [isLogged, setIsLogged] = useState(undefined);
  const navigate = useNavigate();
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
            setIsLogged(true);
          })

          .catch((error) => {
            dispatch(
              userRegister({}, { status: true, message: error.message })
            );
          });
      } else {
        console.log("No está logueado");
        setIsLogged(false);
        navigate("/signInPhone");
      }
    });
  }, []);
  return <>{isLogged ? children : <></>}</>;
};

export default PrivateRouter;
