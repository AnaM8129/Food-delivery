import React from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineUser } from "react-icons/hi";
import { AiOutlineBell } from "react-icons/ai";
import { MdOutlinePayment } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { logoutAsync } from "../../redux/actions/userAction";
import { toggleLoading } from "../../redux/actions/loadingActions";

const User = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logout = () => {
    Swal.fire({
      icon: "info",
      title: "You have to go?",
      showCancelButton: true,
      confirmButtonText: "Yes!",
      confirmCancelButton: "No!",
    })
      .then((response) => {
        if (response.isConfirmed) {
          dispatch(logoutAsync());
          dispatch(toggleLoading());
          navigate("/signInPhone");
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "success",
          title: "Continue",
        });
      });
  };
  return (
    <>
      <section className="user-section">
        <figure className="figure-user">
          <img
            className="figure-user__img"
            src={user ? user.photo : <></>}
            alt="user"
          />
        </figure>
        <p className="username">{user ? user.name : <></>}</p>
        <article
          className="each-option"
          onClick={() => navigate("/editAccount")}
        >
          <div style={{ display: "flex", gap: "5px" }}>
            <HiOutlineUser /> <p>Account edit</p>
          </div>
          <IoIosArrowForward />
        </article>

        <article className="each-option">
          <div style={{ display: "flex", gap: "5px" }}>
            <AiOutlineBell /> <p>Account edit</p>
          </div>
          <IoIosArrowForward />
        </article>

        <article className="each-option">
          <div style={{ display: "flex", gap: "5px" }}>
            <MdOutlinePayment /> <p>Payment</p>
          </div>
          <IoIosArrowForward />
        </article>

        <article className="each-option" onClick={() => navigate("/address")}>
          <div style={{ display: "flex", gap: "5px" }}>
            <MdLocationOn /> <p>Location</p>
          </div>
          <IoIosArrowForward />
        </article>

        <button onClick={logout} className="loggout-button">
          Loggout
        </button>
      </section>
    </>
  );
};

export default User;
