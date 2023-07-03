import React from "react";
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
          <img src={"./Assets/images/Wallet.png"} alt="Connect wallet icon" />
          <h5>Connect Wallet</h5>
          <p>
            Connect your to your MetaMask wallet and you will have access
            to buy, sell and create on our Marketplace
            <br />
          </p>
        </div>
        <div className="sell-nft-card">
          <img src={"./Assets/images/Buy.png"} alt="NFT Marketplace Icon" />
          <h5>NFT Marketplace</h5>
          <p>
            FantomWorld NFT Marketplace is where the buying and selling of the
            3D items on FantomWorld will be bought
          </p>
        </div>
        <div className="sell-nft-card">
          <img src={"./Assets/images/Category.png"} alt="Collect Icon" />
          <h5>Upload NFT</h5>
          <p>
            As a creator we created a royalties system where you can earn as a
            Creator on the FantomWorld
            <br />
          </p>
        </div>
      </div>
    </div>
  );
};

export default SellNft;
