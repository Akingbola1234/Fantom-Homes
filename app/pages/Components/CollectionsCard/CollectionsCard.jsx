import React, { useState, useContext, useEffect } from "react"

import { Swiper, SwiperSlide } from "swiper/react"
import styles from "../HomeCard/HomesCard.module.css"
// import { useNavigate } from "react-router-dom";
import { Modal } from "antd"
// import fantomImage from "../../Assets/images/fantom-logo.webp"
// import { NFTs } from "./data"
import { ethers } from "ethers"
import { useRouter } from "next/router"

import { Autoplay, Pagination, Navigation } from "swiper"
import { HookContext } from "../../../context/Hook"

const CollectionsCard = () => {
    // const navigate = useNavigate();
    const router = useRouter()
    const { wearableNft, getToken, moreDetails, setMoreDetails } =
        useContext(HookContext)

    const handleNavigate = (newModal) => {
        // navigate("/marketplace");
        setMoreDetails(newModal)
        router.push(`/page/NftDetails?${newModal.key}`)
    }
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalContent, setModalContent] = useState([])
    const [NFTs, setNFTs] = useState(null)
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
    useEffect(() => {
        getToken()
    }, [])

    return (
        <div className={styles.nftcard_container}>
            {wearableNft?.map((Nft) => (
                <div
                    className={styles.nftcard}
                    key={Number(Nft.listingId)}
                    onClick={() => showModal(Nft)}
                >
                    <div className={styles.nftcard_details}>
                        <img
                            className={styles.nft_image}
                            src={Nft._uri.image}
                            alt=""
                        />
                        <h5 className={styles.nft_name}>{Nft._uri.name}</h5>
                        <div className={styles.nft_price_number}>
                            <img
                                src={"/Assets/images/fantom-logo.webp"}
                                alt=""
                                className={styles.fantom_logo}
                            />
                            <span className={styles.nft_price}>
                                {ethers.utils.formatEther(Nft.pricePerToken)}{" "}
                                FTM
                            </span>
                        </div>
                        <hr className={styles.nft_line} />
                        <div className={styles.nft_time_button}>
                            <button
                                className={styles.bid}
                                onClick={() => showModal(Nft)}
                            >
                                View
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            <Modal
                className="nft-modal"
                open={isModalOpen}
                centered={true}
                footer={null}
                onOk={handleMint}
                onCancel={handleCancel}
            >
                {modalContent.map((newModal) => (
                    <div
                        className={styles.nft_modal_content}
                        key={Number(newModal.listingId)}
                    >
                        <div className={styles.nft_modal_image}>
                            <img
                                src={newModal._uri.image}
                                alt=""
                                className={styles.nft_modal_img}
                            />
                        </div>

                        <div className={styles.nft_modal_details}>
                            <h5 className={styles.modal_text}>
                                {newModal._uri.name}
                            </h5>
                            <div className={styles.modal_logo_price}>
                                <img
                                    className={styles.fantom_logo}
                                    src={"/Assets/images/fantom-logo.webp"}
                                    alt=""
                                />
                                <h5 className={styles.modal_price}>
                                    {ethers.utils.formatEther(
                                        newModal.pricePerToken
                                    )}{" "}
                                    FTM
                                </h5>
                            </div>
                            <div className={styles.nft_button}>
                                <button
                                    className={styles.secondary_btn}
                                    onClick={() => handleNavigate(newModal)}
                                >
                                    View full Details
                                </button>

                                <button
                                    className={styles.primary_btn}
                                    onClick={handleMint}
                                >
                                    Place a bid
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </Modal>
            {/* <div>
                <button
                    className={styles.view_more_btn}
                    onClick={handleNavigate}
                >
                    View More
                </button>
            </div> */}
        </div>
    )
}

export default CollectionsCard
