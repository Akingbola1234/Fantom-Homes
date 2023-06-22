import React from "react"
// import "./Assets/images/Wallet.png" from "./Assets/images/Wallet.png";
// import  "./Assets/images/Buy.png" from "./Assets/images/Buy.png";
// import  "./Assets/images/Category.png" from "./Assets/images/Category.png";

const SellNft = () => {
    return (
        <div className="sell-nft-container">
            <div className="sell-nft-text">
                <h3>Create FantomWorld with us</h3>
            </div>
            <div className="sell-nft-cards">
                <div className="sell-nft-card">
                    <img
                        src={"./Assets/images/Wallet.png"}
                        alt="Connect wallet icon"
                    />
                    <h5>Connect Wallet</h5>
                    <p>
                        This growth plan will help you reach <br /> your
                        resolutions and achieve the <br />
                        goals you have been striving <br />
                        towards.
                    </p>
                </div>
                <div className="sell-nft-card">
                    <img
                        src={"./Assets/images/Buy.png"}
                        alt="NFT Marketplace Icon"
                    />
                    <h5>NFT Marketplace</h5>
                    <p>
                        This growth plan will help you reach <br /> your
                        resolutions and achieve the <br />
                        goals you have been striving <br />
                        towards.
                    </p>
                </div>
                <div className="sell-nft-card">
                    <img
                        src={"./Assets/images/Category.png"}
                        alt="Collect Icon"
                    />
                    <h5>Collect NFT</h5>
                    <p>
                        This growth plan will help you reach <br /> your
                        resolutions and achieve the <br />
                        goals you have been striving <br />
                        towards.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SellNft
