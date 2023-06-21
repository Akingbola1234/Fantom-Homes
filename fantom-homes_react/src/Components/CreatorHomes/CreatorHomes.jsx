import React from "react";
import "./CreatorHomes.css";
import {AiOutlineUpload} from "react-icons/ai"

const CreatorHomes = () => {
  return (
    <div className="creator-homes-container">
      <div className="creator-text-button">
        <div className="creator-text">
          <h5>My Homes</h5>
          <span>0 RESULTS</span>
        </div>
        <div className="creator-button">
          <button><AiOutlineUpload className="upload-icon"/> Upload Homes</button>
        </div>
      </div>
    </div>
  );
};

export default CreatorHomes;
