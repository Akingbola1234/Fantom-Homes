import React from "react";
import Star from "../../Assets/images/Star.svg";
import heroPageImage from "../../Assets/images/heropage-image.png";
import arrowDown from "../../Assets/images/arrow-down.png";
import "./HeroPage.css";

const HeroPage = () => {
  return (
    <div className="heropage-container">
      <div className="heropage-details">
        <div className="heropage-text">
          <h2>
            Get Your <br />
            Own <span> Dream</span>
            <br />
            Home <img src={Star} alt="Star SVG" className="star" />
          </h2>
          <div className="heropage-sub-details">
            <div className="circle">
              <img src={arrowDown} alt="Arrow Down Vector" />
              <p>Discover Homes</p>
            </div>
            <div className="description">
              <p>Let's Find a home perfect for you...</p>
              <button className="mobile-button">Discover Homes</button>
            </div>
          </div>
          <div className="heropage-stats">
            <div className="stat">
              <h5>Artwork</h5>
              <h4>25.1k</h4>
            </div>
            <div className="stat">
              <h5>Artist</h5>
              <h4>15.6k</h4>
            </div>
            <div className="stat">
              <h5>Auction</h5>
              <h4>15.6k</h4>
            </div>
          </div>
        </div>
        <div className="heropage-image">
          <img
            src={heroPageImage}
            alt="HeroPage Illustration"
            className="heropage-img"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroPage;
