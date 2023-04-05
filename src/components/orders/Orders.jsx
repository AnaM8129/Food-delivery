import React from "react";
import logo from "../../assets/Logo.png";
const Orders = () => {
  return (
    <section className="orders-section">
      <p className="orders-section__title">All orders</p>
      <article className="each-order">
        <img src={logo} alt="logo-restaurant" />
        <div>
          <p style={{ marginBottom: "5%" }}>Pardes Restaurant</p>
          <p style={{ color: "#A7A7A7" }}>$ 132.00</p>
        </div>
        <p style={{ color: "#77DF52" }}>Delivered</p>
      </article>
      <article className="each-order">
        <img src={logo} alt="logo-restaurant" />
        <div>
          <p style={{ marginBottom: "5%" }}>Pardes Restaurant</p>
          <p style={{ color: "#A7A7A7" }}>$ 132.00</p>
        </div>
        <p style={{ color: "#DF5252" }}>Canceled</p>
      </article>
    </section>
  );
};

export default Orders;
