import React from "react";
import { FaAngleLeft } from "react-icons/fa";
import styles from "./NftDetailsPage.module.css";

const NftDetailsPage = () => {
  return (
    <div className={styles["ntf-card-page-container"]}>
      <div className={styles["ntf-card-page-details"]}>
        <div className={styles["ntf-card-page-image"]}>
          <img src="/Assets/images/3d-home.jpg" alt="NFT Image" />
        </div>
        <div className={styles["ntf-card-page-card"]}>
          <button>
            {" "}
            <FaAngleLeft /> Back | FantomWorld
          </button>
          <h4>FantomHomes</h4>
          <span>NFT ID </span>
          <h5>Attributes: </h5>
          <span>Owned by </span>
          <button>Place a bid</button>
        </div>
      </div>
    </div>
  );
};

export default NftDetailsPage;
