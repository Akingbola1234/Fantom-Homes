import React, { useContext, useState } from "react"
import styles from "../HomeCard/HomesCard.module.css"
import { useRouter } from "next/router"
import { Swiper, SwiperSlide } from "swiper/react"

// import { useNavigate } from "react-router-dom";
import { Modal } from "antd"
// import fantomImage from "../../Assets/images/fantom-logo.webp"
// import { NFTs } from "./data";

import { Autoplay, Pagination, Navigation } from "swiper"
import { HookContext } from "../../../context/Hook"
import { Toaster, toast } from "react-hot-toast"
import { useEffect } from "react"
import { useContractWrite } from "wagmi"
import { MarketplaceAbi, MarketplaceAddress } from "../../../constants"
import { ethers } from "ethers"
import { ClipLoader } from "react-spinners"

const LandsCard = () => {
    // const navigate = useNavigate();
    const router = useRouter()
    const { char, getToken, setMoreDetails, loading } = useContext(HookContext)
    const color = "#fff"
    const handleNavigate = (newModal) => {
        // navigate("/marketplace");
        setMoreDetails(newModal)
        router.push(`/page/NftDetails?${newModal.key}`)
    }
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalContent, setModalContent] = useState([])
    const [NFTs, setNFts] = useState([])
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

    const { write, isError, isSuccess, isLoading } = useContractWrite({
        address: MarketplaceAddress,
        abi: MarketplaceAbi,
        functionName: "buyFromListing",
    })
    useEffect(() => {
        {
            isError && toast("You can't buy this NFT ☹️ Check Your Wallet")
        }

        {
            isLoading && toast("Loading.... 🤪")
        }

        {
            isSuccess && toast("You Now Own This Nft 🥳")
        }
    }, [isError, isLoading, isSuccess])
    return (
        <>
            <div className={styles.nftcard_container}>
                {char.length > 0 ? (
                    char?.map((Nft) => (
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
                                <h5 className={styles.nft_name}>
                                    {Nft._uri.name} #{Number(Nft.tokenId)}
                                </h5>
                                <div className={styles.nft_price_number}>
                                    <img
                                        src={"/Assets/images/fantom-logo.webp"}
                                        alt=""
                                        className={styles.fantom_logo}
                                    />
                                    <span className={styles.nft_price}>
                                        {ethers.utils.formatEther(
                                            Nft.pricePerToken
                                        )}{" "}
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
                    ))
                ) : (
                    <div className="flex flex-col items-center text-[#fff]">
                        <ClipLoader
                            color={color}
                            loading={loading}
                            size={30}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                        <h1 className="text-[#8d1cfe]">Getting NFTs.....🥸</h1>
                        <span className="text-gray-500">
                            Refresh if it takes too long
                        </span>
                    </div>
                )}

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
                                        onClick={() =>
                                            write({
                                                value: newModal.pricePerToken,
                                                args: [newModal.listingId],
                                            })
                                        }
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
                <Toaster />
            </div>
        </>
    )
}

export default LandsCard
