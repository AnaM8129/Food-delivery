import React from "react";
import { CiEdit } from "react-icons/ci";
import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AccountEdit = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  return (
    <section className="user-section">
      <MdArrowBackIosNew
        onClick={() => navigate("/user")}
        className="arrow-icon"
      />
      <p className="profile-text">Profile</p>
      <figure className="figure-user">
        <img
          className="figure-user__img"
          src={user ? user.photo : <></>}
          alt="user"
        />
      </figure>

      <article className="each-option">
        <input
          className="input-edit"
          type="text"
          placeholder={user ? user.name : <></>}
        />
        <CiEdit />
      </article>

      <article className="each-option">
        <input
          className="input-edit"
          type="text"
          placeholder={user ? user.email : <></>}
        />
        <CiEdit />
      </article>

      <article className="each-option">
        <input
          className="input-edit"
          type="text"
          placeholder={user ? user.number : <></>}
        />
        <CiEdit />
      </article>

      <article className="each-option">
        <input
          className="input-edit"
          type="text"
          placeholder={user ? user.birthday : <></>}
        />
        <CiEdit />
      </article>
      <button className="submit-register">Save changes</button>
    </section>
  );
};

export default AccountEdit;
