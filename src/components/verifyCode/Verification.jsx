import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { verifyCodeAsync } from "../../redux/actions/userAction";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../firebase/firebaseConfig";
import logo from "../../assets/logoPrincipal.png";

const Verification = () => {
  const navigate = useNavigate();
  const { error } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    dispatch(verifyCodeAsync(data.code));
  };

  useEffect(() => {
    if (error.status) {
      Swal.fire(`Ha ocurrido un error ${error.message}`, "error");
    } else if (error.status === false) {
      Swal.fire(`Muy bien!, hemos verificado tu código`, "success").then(() => {
        if (auth.currentUser.displayName && auth.currentUser.photoURL) {
          navigate("/");
        } else {
          navigate("/register");
        }
      });
    }
  }, [error]);
  return (
    <>
      <section className="login-phone-section">
        <figure className="figure-logo">
          <img src={logo} alt="logo" />
        </figure>
        <p
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "20px",
            marginBottom: "3%",
          }}
        >
          Enter code
        </p>
        <p style={{ textAlign: "center", fontSize: "1rem" }}>
          We send you a code, can take a few minutes
        </p>
      </section>
      <form onSubmit={handleSubmit(onSubmit)} className="signIn-phone">
        <div className="input-sign-container">
          <input
            className="input-sign"
            type="number"
            placeholder="Enter the code"
            {...register("code", {
              required: "Code is required",
            })}
          />
        </div>
        {errors.code ? (
          <span className="error-message">{errors.code.message}</span>
        ) : (
          <></>
        )}
        <button type="submit" className="button-send-phone">
          SEND
        </button>
      </form>
    </>
  );
};

export default Verification;
