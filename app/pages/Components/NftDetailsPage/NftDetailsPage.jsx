import React from "react";
import Link from "next/link"
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
          <Link href={"/"}>
          <button className={styles["nft-card-page-back-button"]}>
            {" "}
            <FaAngleLeft /> Back | FantomWorld
          </button>
          </Link>
          <h4 className={styles["nft-card-page-text"]}>FantomHomes</h4>
          <span className={styles["nft-card-page-span"]}>NFT ID </span>
          <h5 className={styles["nft-card-page-attributes"]}>Attributes: </h5>
          <span className={styles["nft-card-page-span"]}>Owned by </span>
          <button className={styles["nft-card-page-bid"]}>Place a bid</button>
        </div>
      </div>
    </div>
  );
};

export default NftDetailsPage;
