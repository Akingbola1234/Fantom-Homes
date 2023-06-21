import React, { useState } from "react";
import { Drawer } from "antd";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import {useNavigate} from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FaBars } from "react-icons/fa";

const NavBar = () => {
  const navigate = useNavigate()
  const handleNavigate = () =>{
    navigate("/")
  }
  const [open, setOpen] = useState(false);
  const showMenu = () => {
    setOpen(true);
  };
  const hideMenu = () => {
    setOpen(false);
  };
  return (
    <div className="navbar-container">
      <div className="logo">
        <h5 onClick={handleNavigate}>FantomWorld</h5>
      </div>
      <div className="nav-list">
        <ul>
          <li>
            <NavLink
              className="navigation-link"
              to="/marketplace"
              style={({ isActive }) => ({
                color: isActive ? "#0038ed" : "#FFF",
              })}
            >
              Marketplace
            </NavLink>
          </li>
          <li>
            <NavLink
              className="navigation-link"
              to="/creator"
              style={({ isActive }) => ({
                color: isActive ? "#0038ed" : "#FFF",
              })}
            >
              Creator
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="nav-button">
        <button>Connect Wallet</button>
        {/* <ConnectButton className="connect-btn">Connect Wallet</ConnectButton> */}
      </div>
      <button onClick={showMenu} className="nav-bar-icon">
        <FaBars />
      </button>
      <Drawer
        placement="left"
        onClose={hideMenu}
        open={open}
        className="mobile-menu"
      >
        <ul>
          <li>Drop</li>
          <li>Marketplace</li>
          <li>Creator</li>
          <li>Community</li>
          <button>Connect Wallet</button>
        </ul>
      </Drawer>
    </div>
  );
};

export default NavBar;
