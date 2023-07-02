import React, { useState, useEffect } from "react"
import styles from "./HomesCard.module.css"
import { Modal } from "antd"
import { useContext } from "react"
import { HookContext } from "../../../context/Hook"
import { useRouter } from "next/router"
import { useAccount } from "wagmi"
import { FolderPlusIcon, WalletIcon } from "@heroicons/react/24/outline"

const NotListedNft = ({ data }) => {
    const { clickedNft, setClickedNft } = useContext(HookContext)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalContent, setModalContent] = useState([])
    const [imageUrl, setImageUrl] = useState([])
    const [dataSet, setdataSet] = useState(null)
    const router = useRouter()
    const { address } = useAccount()

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

    const handleNavigate = (nftData) => {
        setClickedNft(nftData)
        console.log(clickedNft)
        router.push("/page/CreatNft")
    }

    useEffect(() => {
        const convertIPFSURI = async () => {
            const baseUri = "ipfs://"
            const back = "/blob"
            const convertedData = await Promise.all(
                data.map(async (Nft) => {
                    const ipfsUri = Nft.nftParams.image
                    console.log(ipfsUri)

                    if (ipfsUri.includes(baseUri)) {
                        const hash = ipfsUri
                            .replace(baseUri, "")
                            .replace(back, "")
                        let fileResult = []
                        const res = await fetch(
                            `https://${hash}.ipfs.dweb.link/blob`
                        )
                        // console.log(res)
                        const blob = await res.blob()
                        const fileReader = new FileReader()
                        fileReader.readAsBinaryString(blob)
                        const fileResultPromise = new Promise(
                            (resolve) =>
                                (fileReader.onloadend = () => {
                                    const dataUrl = fileReader.result
                                    setdataSet(dataUrl)
                                    resolve(dataUrl)
                                    fileResult.push(dataUrl)
                                })
                        )
                        console.log(fileResult)
                        const result = await fileResultPromise
                        const newNft = { ...Nft, imageUrl: result }
                        console.log(newNft)
                        return newNft
                    }
                    return Nft
                })
            )
            setImageUrl(convertedData.sort((a, b) => b.tokenId - a.tokenId))
        }

        convertIPFSURI()
    }, [data])

    return (
        <div className={styles.nftcard_container}>
            {imageUrl.length > 0 ? (
                imageUrl.map((Nft) => (
                    <div
                        className={styles.nftcard}
                        key={Nft.tokenId}
                        onClick={() => showModal(Nft)}
                    >
                        <div className={styles.nftcard_details}>
                            <img
                                className={styles.nft_image}
                                src={Nft.imageUrl || Nft.nftParams?.image}
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
                <div className=" border-dashed w-[50%] h-[15rem] flex justify-center items-center border-2 mb-4 border-[#333a4b] rounded-xl p-7">
                    {!address ? (
                        <div className="px-3 py-2 rounded-xl flex flex-col text-[#fff] justify-center w-fit h-fit items-center text-center mt-3">
                            <WalletIcon className="h-10 w-10" />

                            <span className="text-[15px] font-medium">
                                Connect Your Wallet
                            </span>
                        </div>
                    ) : (
                        <div className="px-3 py-2 rounded-xl flex flex-col text-[#fff] justify-center w-fit h-fit items-center text-center mt-3">
                            <FolderPlusIcon className="h-10 w-10" />

                            <span className="text-[15px] font-medium">
                                Create a FantomHome
                            </span>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default NotListedNft
