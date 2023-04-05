import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  updateProfileAsync,
  userRegisterAsync,
} from "../../redux/actions/userAction";
import Loading from "../loading/Loading";
import { auth } from "../../firebase/firebaseConfig";
import { fileUpLoad } from "../../servicesFirestore/fileUpLoad";

const Register = () => {
  //Hook para leer estados
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);
  const { error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogged(true);
      }
    });
  });

  const submitForm = async (data) => {
    console.log(data);
    const photo = data.photo[0] ? await fileUpLoad(data.photo[0]) : "";
    const user = {
      name: data.name,
      email: data.email,
      password: data.password,
      location: data.location,
      birthday: data.birthday,
      photo: photo,
    };
    if (isLogged) {
      dispatch(updateProfileAsync(user));
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } else {
      dispatch(userRegisterAsync({ ...user, phone: data.phone }));
    }
  };

  return (
    <main className="main-register">
      <h1 className="main-register__title">Create an account</h1>
      <form onSubmit={handleSubmit(submitForm)} className="form-register">
        <label className="label-register">
          NAME
          <div
            className={
              errors.name ? "div-register-error" : "div-input-register"
            }
          >
            <input
              className={errors.name ? "input-error" : "input-register"}
              type="text"
              placeholder="Roberty Foxy"
              {...register("name", {
                required: "Name is required",
              })}
            />
          </div>
        </label>
        {errors.name ? (
          <span className="error-message">{errors.name.message}</span>
        ) : (
          <></>
        )}
        <label className="label-register">
          EMAIL
          <div
            className={
              errors.name ? "div-register-error" : "div-input-register"
            }
          >
            <input
              className={errors.email ? "input-error" : "input-register"}
              type="email"
              placeholder="example@gmail.com"
              {...register("email", {
                required: "Email is required",
              })}
            />
          </div>
        </label>
        {errors.email ? (
          <span className="error-message">{errors.email.message}</span>
        ) : (
          <></>
        )}
        <label className="label-register">
          PHONE
          <div
            className={
              errors.phone ? "div-register-error" : "div-input-register"
            }
          >
            <input
              className={errors.phone ? "input-error" : "input-register"}
              type="number"
              placeholder="333 333 33 33"
              {...register("phone", {
                required: "Phone is required",
              })}
            />
          </div>
        </label>
        {errors.phone ? (
          <span className="error-message">{errors.phone.message}</span>
        ) : (
          <></>
        )}
        <label className="label-register">
          BIRTHDAY
          <div
            className={
              errors.birthday ? "div-register-error" : "div-input-register"
            }
          >
            <input
              className={errors.birthday ? "input-error" : "input-register"}
              type="date"
              placeholder="00/00/00"
              {...register("birthday", {
                required: "Birthday is required",
              })}
            />
          </div>
        </label>
        {errors.birthday ? (
          <span className="error-message">{errors.birthday.message}</span>
        ) : (
          <></>
        )}
        <label className="label-register">
          PHOTO
          <div
            className={
              errors.photo ? "div-register-error" : "div-input-register"
            }
          >
            <input
              className={errors.photo ? "input-error" : "input-register"}
              type="file"
              placeholder="00/00/00"
              {...register("photo", {
                required: "Photo is required",
              })}
            />
          </div>
        </label>
        {errors.photo ? (
          <span className="error-message">{errors.photo.message}</span>
        ) : (
          <></>
        )}
        <label className="label-register">
          LOCATION
          <div
            className={
              errors.location ? "div-register-error" : "div-input-register"
            }
          >
            <input
              className={errors.location ? "input-error" : "input-register"}
              type="text"
              placeholder="crr 100 # 15b 30"
              {...register("location", {
                required: "Location is required",
              })}
            />
          </div>
        </label>
        {errors.location ? (
          <span className="error-message">{errors.location.message}</span>
        ) : (
          <></>
        )}
        <label className="label-register">
          PASSWORD
          <div
            className={
              errors.name ? "div-register-error" : "div-input-register"
            }
          >
            <input
              className={errors.password ? "input-error" : "input-register"}
              type="password"
              placeholder="*****"
              {...register("password", {
                required: "Password is required",
              })}
            />
          </div>
        </label>
        {errors.password ? (
          <span className="error-message">{errors.password.message}</span>
        ) : (
          <></>
        )}
        <button className="submit-register" type="submit" disabled={loading}>
          Sing in
        </button>
        {loading ? <Loading /> : <></>}
        <Link className="link-login" to="/login">
          You have an account? Sign in!
        </Link>
      </form>
    </main>
  );
};

export default Register;
