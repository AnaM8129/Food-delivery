import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLoginAsync } from "../../redux/actions/userAction";
import Swal from "sweetalert2";
import { onAuthStateChanged } from "firebase/auth";
import Loading from "../loading/Loading";
// import { userLoginAsync } from "../../redux/actions/userAction";

const Login = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const loading = useSelector((state) => state.loading);
  console.log(loading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitForm = (data) => {
    dispatch(userLoginAsync(data));
  };

  useEffect(() => {
    if (user?.uid) {
      Swal.fire({
        icon: "success",
        title: `Welcome ${user.name}`,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    }
  }, [user]);

  return (
    <section className="login-section">
      <h1 className="login-section__title">Sign in with email</h1>
      <form className="form-login" onSubmit={handleSubmit(submitForm)}>
        <input
          className="form-login__input"
          type="email"
          placeholder="Enter email"
          {...register("email", {
            required: "Email is required",
          })}
        />
        {errors.email ? (
          <span className="error-message">{errors.email.message}</span>
        ) : (
          <></>
        )}
        <input
          className="form-login__input"
          type="password"
          placeholder="Enter password"
          {...register("password", {
            required: "Password is required",
          })}
        />
        {errors.password ? (
          <span className="error-message">{errors.password.message}</span>
        ) : (
          <></>
        )}
        <button type="submit" className="form-login__button">
          Sign in
        </button>
        {loading ? <Loading /> : <></>}
        {/* {user.error ? (
          <span className="error-message">
            Usuario o contraseña incorrectos!
          </span>
        ) : (
          <></>
        )} */}
        <Link to="/register" className="link-login">
          ¿Don't have an account? Register!
        </Link>
      </form>
    </section>
  );
};

export default Login;
