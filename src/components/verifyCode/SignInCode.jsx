import React from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import logo from "../../assets/logoPrincipal.png";
import { AiTwotonePhone } from "react-icons/ai";

const SignInCode = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //  El recaptcha nos permite verificar que no somos robot
  const generateRecaptcha = () => {
    try {
      //Recibe tres partametros: el id del contenedor que colocamos en la parte inferior, el objeto con la configuración
      //del recaptcha y la constante auth (del archivo de firebaseConfig)
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptch-container",
        {
          size: "invisible",
          callback: () => {},
        },
        auth
      );
    } catch (error) {
      console.log(error);
    }
  };
  const sendSMS = (ind, number, recaptchaVerifier) => {
    signInWithPhoneNumber(auth, `${ind}${number}`, recaptchaVerifier)
      .then((response) => {
        window.confirmationResult = response;
        console.log(window.confirmationResult);

        Swal.fire({
          icon: "success",
          title: "Perfecto",
          text: "En unos instantes te llegará un código de verificación",
        }).then(() => {
          navigate("/enterCode");
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Lo sentimos",
          text: `Ha ocurrido un error ${error.message}`,
        });
      });
  };
  const onSubmit = (data) => {
    console.log(data.number);
    generateRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    sendSMS("+57", data.number, appVerifier);
    console.log(appVerifier);
  };

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
          Sign in
        </p>
        <p style={{ textAlign: "center", fontSize: "1rem" }}>
          Login or create an account with your phone number to start ordering
        </p>
      </section>
      <form onSubmit={handleSubmit(onSubmit)} className="signIn-phone">
        <div className="input-sign-container">
          <AiTwotonePhone className="input-container-items" />
          <p className="input-container-items">+57</p>
          <input
            className="input-sign"
            type="text"
            {...register("number", {
              required: "Number is required",
            })}
          />
        </div>
        <button type="submit" className="button-send-phone">
          SEND
        </button>
        <Link className="link-login" to="/login">
          Login with email
        </Link>
      </form>

      <div id="recaptch-container"></div>
    </>
  );
};

export default SignInCode;
