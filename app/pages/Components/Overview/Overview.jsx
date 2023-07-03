import React from "react"
import styles from "./Overview.module.css"
// import "/Assets/images/collection-illustration.png" from "/Assets/images/collection-illustration.png";
// import "/Assets/images/home-illustration.png" from "/Assets/images/home-illustration.png";
// import /Assets/images/land-illustration.png" from "/Assets/images/land-illustration.png";

const Overview = () => {
    return (
        <div className={styles["overview-container"]}>
            <h4>Let's Build the FantomWorld together!</h4>
            <div className={styles["overview-cards"]}>
                <div className={styles["overview-card"]}>
                    <h5>Homes</h5>
                    <span>
                        Build your space in your LAND. You can use free 3D
                        models or upload your own.
                    </span>
                    <img
                        src={"/Assets/images/home-illustration.png"}
                        alt="collection-icon"
                        className="home-image"
                    />
                    <button>Manage Your Home</button>
                </div>
                <div className={styles["overview-card"]}>
                    <h5>Wearables</h5>
                    <span>
                        Create, review and publish your collections of wearables
                        and emotes
                    </span>
                    <img
                        src={"/Assets/images/collection-illustration.png"}
                        alt="collection-icon"
                        className="collection-image"
                    />
                    <button>Manage Wearables</button>
                </div>
                <div className={styles["overview-card"]}>
                    <h5>Lands</h5>
                    <span>
                        Publish Scenes, create Estates and manage permissions of
                        your LAND.
                    </span>
                    <img
                        src={"/Assets/images/land-illustration.png"}
                        alt="collection-icon"
                        className="land-image"
                    />
                    <button>Manage Your Land</button>
                </div>
            </div>
        </div>
    )
}

export default Overview
