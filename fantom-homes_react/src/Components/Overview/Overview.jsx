import React from "react";
import "./Overview.css";
import collectionImage from "../../Assets/images/collection-illustration.png";
import homeImage from "../../Assets/images/home-illustration.png";
import landImage from "../../Assets/images/land-illustration.png";

const Overview = () => {
  return (
    <div className="overview-container">
      <h4>Let's Build the FantomWorld together!</h4>
      <div className="overview-cards">
        <div className="overview-card">
          <h5>Homes</h5>
          <span>
            Create, review and publish your collections of wearables and emotes
          </span>
          <img src={homeImage} alt="collection-icon" className="home-image" />
          <button>Manage Collections</button>
        </div>
        <div className="overview-card">
          <h5>Collection</h5>
          <span>
            Create, review and publish your collections of wearables and emotes
          </span>
          <img
            src={collectionImage}
            alt="collection-icon"
            className="collection-image"
          />
          <button>Manage Collections</button>
        </div>
        <div className="overview-card">
          <h5>Lands</h5>
          <span>
            Create, review and publish your collections of wearables and emotes
          </span>
          <img src={landImage} alt="collection-icon" className="land-image" />
          <button>Manage Collections</button>
        </div>
      </div>
    </div>
  );
};

export default Overview;
