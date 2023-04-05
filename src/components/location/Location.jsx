import React from "react";
import { useForm } from "react-hook-form";
import ubication from "../../assets/icons/ubication-icon.png";
import { MdLocationPin } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { updateLocationAsync } from "../../redux/actions/userAction";
import Swal from "sweetalert2";
import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Location = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    location: user ? user.location : <></>,
  };
  const { handleSubmit, register } = useForm({
    defaultValues: initialValues,
  });

  const onSubmit = (data) => {
    dispatch(updateLocationAsync(data.location));
    Swal.fire({
      icon: "success",
      title: "Your location has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <section className="big-container-location">
      <MdArrowBackIosNew
        onClick={() => navigate("/user")}
        className="arrow-icon"
      />
      <p style={{ textAlign: "center", marginBottom: "12%" }}>Manage adress</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-container-location">
          <MdLocationPin style={{ fontSize: "20px" }} />
          <div>
            <p style={{ color: "gray", fontSize: "14px" }}>Adress 1</p>
            <input
              className="input-location"
              type="text"
              {...register("location")}
              placeholder={user ? user.location : <></>}
            />
          </div>
          <button className="button-trash">
            <BsTrash />
          </button>
        </div>
        <button className="button-save" type="submit">
          save
        </button>
      </form>
    </section>
  );
};

export default Location;
