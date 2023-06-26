import React, { useState } from "react"
import styles from "./HomesCard.module.css"
// import { useNavigate } from "react-router-dom";
import { Modal } from "antd"
// import fantomImage from "../../Assets/images/fantom-logo.webp"
import { NFTs } from "../HomeCard/data"
import Link from "next/link"
import { useContext } from "react"
import HookProvider, { HookContext } from "../../../context/Hook"
import { useRouter } from "next/router"

const NotListedNft = ({ data }) => {
    const { clickedNft, setClickedNft } = useContext(HookContext)
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

    const router = useRouter()

    const handleNavigate = (nftData) => {
        setClickedNft(nftData)
        console.log(clickedNft)
        router.push("/page/CreatNft")
    }

    return (
        <div className={styles.nftcard_container}>
            {data ? (
                data.map((Nft) => (
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
                                    onClick={() => handleNavigate(Nft)}
                                >
                                    List For Sale
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-[30px] text-[#fff]">
                    Getting Your Nfts....
                </div>
            )}
        </div>
    )
}

export default NotListedNft
