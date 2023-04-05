import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { HiOutlineUser } from "react-icons/hi";
import { RxCounterClockwiseClock } from "react-icons/rx";
import { IoHomeOutline } from "react-icons/io5";

const NavBar = () => {
  return (
    <>
      <ul className="navbar">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "activeLink" : "navLink")}
          >
            <IoHomeOutline />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/search"
            className={({ isActive }) => (isActive ? "activeLink" : "navLink")}
          >
            <BsSearch />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/orders"
            className={({ isActive }) => (isActive ? "activeLink" : "navLink")}
          >
            <RxCounterClockwiseClock />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/user"
            className={({ isActive }) => (isActive ? "activeLink" : "navLink")}
          >
            <HiOutlineUser />
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </>
  );
};

export default NavBar;
