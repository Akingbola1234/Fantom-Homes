import React, { useState } from "react"
import styles from "./HomesCard.module.css"
import Link from "next/link"
import { useRouter } from "next/router"
import { Modal } from "antd"
import { NFTs } from "../NotListedNFT/data"
import {
    useContractRead,
    useAccount,
    useContractInfiniteReads,
    paginatedIndexesConfig,
} from "wagmi"
import {
    FantomHomesAbi,
    FantomHomesAddress,
    MarketplaceAbi,
    MarketplaceAddress,
} from "../../../constants"
import { providers, Contract } from "ethers"

const HomesCard = async () => {
    const router = useRouter()
    const provider = new providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()

    // const navigate = useNavigate();
    const { address } = useAccount()
    const handleNavigate = (newModal) => {
        // navigate("/marketplace");
        router.push(`/page/NftDetails?${newModal.key}`)
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

    const totalSupply = useContractRead({
        address: MarketplaceAddress,
        abi: MarketplaceAbi,
        functionName: "totalListings",
    })

    const _totalSupply = Number(totalSupply.data)
    console.log(_totalSupply)

    const getListing = useContractRead({
        address: MarketplaceAddress,
        abi: MarketplaceAbi,
        functionName: "getListing",
        args: [0],
    })

    const mlootContractConfig = {
        address: MarketplaceAddress,
        abi: MarketplaceAbi,
    }

    const { data, fetchNextPage } = useContractInfiniteReads({
        ...paginatedIndexesConfig(
            (index) => {
                return [
                    {
                        ...mlootContractConfig,
                        functionName: "getListing",
                        args: [index],
                    },
                ]
            },
            { start: 0, perPage: _totalSupply, direction: "increment" }
        ),
    })

    async function getTokensUri(tokenId) {
        const contract = new Contract(
            FantomHomesAddress,
            FantomHomesAbi,
            signer
        )
        const tx = await contract.tokenURI(tokenId)
        console.log(tx)
        return tx
    }

    async function logJSONData(tokenUri) {
        const response = await fetch(tokenUri)
        const jsonData = await response.json()
        return jsonData
    }

    if (address) {
        // console.log(data.pages[0][0])
        const tokenArr = []
        for (let i = 0; i < data.pages[0].length; i++) {
            const element = data.pages[0][i].result
            if (element.assetContract == FantomHomesAddress) {
                const tokenUri = await getTokensUri(element.tokenId)
                console.log(tokenUri)
                const jsonData = await logJSONData(tokenUri)

                const token = { ...element, jsonData }
                tokenArr.push(token)
            }
        }

        console.log(tokenArr)
    }
    return (
        <div className={styles.nftcard_container}>
            {NFTs.map((Nft) => (
                <div
                    className={styles.nftcard}
                    key={Nft.key}
                    onClick={() => showModal(Nft)}
                >
                    <div className={styles.nftcard_details}>
                        <img
                            className={styles.nft_image}
                            src={Nft.nftImage}
                            alt=""
                        />
                        <h5 className={styles.nft_name}>{Nft.nftName}</h5>
                        <div className={styles.nft_price_number}>
                            <img
                                src={"/Assets/images/fantom-logo.webp"}
                                alt=""
                                className={styles.fantom_logo}
                            />
                            <span className={styles.nft_price}>
                                {Nft.nftPrice}
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
                        key={newModal.nftName}
                    >
                        <div className={styles.nft_modal_image}>
                            <img
                                src={newModal.nftImage}
                                alt=""
                                className={styles.nft_modal_img}
                            />
                        </div>

                        <div className={styles.nft_modal_details}>
                            <h5 className={styles.modal_text}>
                                {newModal.nftName}
                            </h5>
                            <div className={styles.modal_logo_price}>
                                <img
                                    className={styles.fantom_logo}
                                    src={"/Assets/images/fantom-logo.webp"}
                                    alt=""
                                />
                                <h5 className={styles.modal_price}>
                                    {newModal.nftPrice} FTM
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
            <div>
                <button
                    className={styles.view_more_btn}
                    onClick={handleNavigate}
                >
                    View More
                </button>
            </div>
        </div>
    )
}

export default HomesCard
