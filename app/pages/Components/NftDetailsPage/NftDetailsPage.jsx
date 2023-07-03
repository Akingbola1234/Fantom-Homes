import React, { useContext } from "react"
import Link from "next/link"
import { FaAngleLeft } from "react-icons/fa"
import styles from "./NftDetailsPage.module.css"
import { HookContext } from "../../../context/Hook"
import { ethers } from "ethers"
import { useContractWrite, usePrepareContractWrite } from "wagmi"
import { MarketplaceAbi, MarketplaceAddress } from "../../../constants"
import { Toaster, toast } from "react-hot-toast"

const NftDetailsPage = () => {
    const { moreDetails } = useContext(HookContext)
    console.log(moreDetails)

    const _buy = usePrepareContractWrite({
        address: MarketplaceAddress,
        abi: MarketplaceAbi,
        functionName: "buyFromListing",
        args: [moreDetails?.listingId],
        value: [moreDetails?.pricePerToken],
        onError() {
            toast("You can't buy this NFT ☹️")
        },
        onSuccess() {
            toast("You can buy this NFT 😉")
        },
    })
    const buy = useContractWrite(_buy.config)

    return (
        <div className={styles["ntf-card-page-container"]}>
            <div className={styles["ntf-card-page-details"]}>
                <div className={styles["ntf-card-page-image"]}>
                    <img
                        src={moreDetails?._uri?.image}
                        className="object-contain "
                        alt="NFT Image"
                    />
                </div>
                <div className={styles["ntf-card-page-card"]}>
                    <Link href={"/"}>
                        <button className={styles["nft-card-page-back-button"]}>
                            {" "}
                            <FaAngleLeft /> Back | FantomWorld
                        </button>
                    </Link>
                    <div className="flex flex-col justify-between">
                        <h4 className={styles["nft-card-page-text"]}>
                            {moreDetails?._uri?.name} #
                            {Number(moreDetails?.tokenId)}
                        </h4>
                        <div className="flex flex-col">
                            <span className={styles["nft-card-page-span"]}>
                                Creator
                            </span>
                            <span>{moreDetails?.listingCreator}</span>
                        </div>
                    </div>

                    <div>
                        <h5 className={styles["nft-card-page-attributes"]}>
                            Description:
                        </h5>
                        <p className="text-[15px] font-medium bg-[#8d1cfe] p-3 rounded-md text-[#fff]">
                            {moreDetails?._uri?.description}
                        </p>
                    </div>

                    {moreDetails?._uri?.attributes && (
                        <div>
                            <h5 className={styles["nft-card-page-attributes"]}>
                                Attributes:
                            </h5>
                            {moreDetails?._uri?.attributes.map((att) => {
                                return (
                                    <p className="text-[15px] font-medium bg-[#8d1cfe] p-3 rounded-md text-[#fff]">
                                        {att.trait_type}:{" "}
                                        <span>{att.value}</span>
                                    </p>
                                )
                            })}
                        </div>
                    )}

                    <button
                        className={styles["nft-card-page-bid"]}
                        onClick={buy.write}
                    >
                        {buy.isLoading
                            ? "Loading....."
                            : buy.isSuccess
                            ? "Successful Check Your Wallet"
                            : "Buy Nft"}
                    </button>
                </div>
            </div>
            <Toaster />
        </div>
    )
}

export default NftDetailsPage
