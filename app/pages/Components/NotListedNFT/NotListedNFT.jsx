import React, { useState } from "react"
import styles from "./HomesCard.module.css"
// import { useNavigate } from "react-router-dom";
import { Modal } from "antd"
// import fantomImage from "../../Assets/images/fantom-logo.webp"
import { NFTs } from "../HomeCard/data"

const NotListedNft = ({ data }) => {
    // const navigate = useNavigate();
    const handleNavigate = () => {
        // navigate("/marketplace");
    }
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalContent, setModalContent] = useState([])
    const showModal = (Nft) => {
        setIsModalOpen(true)
        setModalContent([Nft])
    }
    const handleMint = () => {
        setIsModalOpen(false)
    }
    const handleCancel = () => {
        setIsModalOpen(false)
    }
    return (
        <div className={styles.nftcard_container}>
            {data.map((Nft) => (
                <div
                    className={styles.nftcard}
                    key={Nft.tokenId}
                    onClick={() => showModal(Nft)}
                >
                    <div className={styles.nftcard_details}>
                        <img
                            className={styles.nft_image}
                            src={Nft.nftParams.image}
                            alt=""
                        />
                        <h5 className={styles.nft_name}>
                            {Nft.nftParams.name}
                        </h5>

                        <hr className={styles.nft_line} />
                        <div className={styles.nft_time_button}>
                            <button
                                className={styles.bid}
                                onClick={() => showModal(Nft)}
                            >
                                List Nft
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default NotListedNft
