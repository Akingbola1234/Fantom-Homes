import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useContext } from "react"
import { truncate } from "truncate-ethereum-address"
import Button from "../Components/Button"
import { BackwardIcon, XCircleIcon } from "@heroicons/react/24/outline"
import FormInput from "../Components/FormInput"
import { alpha, styled } from "@mui/material/styles"
import { pink } from "@mui/material/colors"
import Switch from "@mui/material/Switch"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import Navbar from "../Components/NavBar/NavBar"
import { Blob } from "nft.storage"
import { BigNumber, Contract, ethers, providers, utils } from "ethers"
import { useRouter } from "next/router"
import { ClipLoader } from "react-spinners"
import { HookContext } from "../../context/Hook"
import { watchContractEvent } from "@wagmi/core"
import {
    FantomAccAbi,
    FantomHomesAbi,
    FantomHomesAddress,
    Marketplace,
    MarketplaceAbi,
    MarketplaceAddress,
} from "../../constants"
import { approveMarketplace } from "../../utils/fantomWorld/createAuction"

const CreateNFT = () => {
    const label = { inputProps: { "aria-label": "Color switch demo" } }
    const fileRef = useRef("")
    const zero = BigNumber.from(0)
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [buyoutPrice, setBuyoutPrice] = useState("")

    const router = useRouter()
    const { clickedNft, setClickedNft } = useContext(HookContext)
    const [loading, setLoading] = useState(false)
    const [loadingText, setLoadingText] = useState("")
    const color = "#fff"
    const [thisOwner, setThisOwner] = useState("")
    const addImage = async (e) => {
        const reader = new FileReader()
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
        }
        reader.onload = (readerEvent) => {
            setNftImage(readerEvent.target.result)
        }
    }

    const removeImage = () => {
        setNftImage(null)
    }
    const provider = new providers.Web3Provider(window.ethereum)

    const listNft = async () => {
        try {
            setLoading(true)
            const signer = provider.getSigner()

            const assetAbi =
                clickedNft.assetContract == FantomHomesAddress
                    ? FantomHomesAbi
                    : FantomAccAbi
            await approveMarketplace(
                clickedNft.assetContract,
                assetAbi,
                signer,
                clickedNft.tokenId,
                MarketplaceAddress
            )

            const contract = new Contract(
                MarketplaceAddress,
                MarketplaceAbi,
                signer
            )

            const StartDate =
                Math.floor(Date.now() / 1000) + 60 + Number(startTime)
            const EndDate = Math.floor(StartDate + Number(endTime))
            const ListingParameters = {
                assetContract: clickedNft.assetContract,
                tokenId: clickedNft.tokenId,
                quantity: 1,
                pricePerToken: ethers.utils.parseEther(buyoutPrice),
                startTimestamp: StartDate,
                endTimestamp: EndDate,
                bool: false,
            }

            const tx = await contract.createListing(ListingParameters)
            console.log(tx)
            await tx.wait(3)
            setLoading(false)
            router.push("/page/Marketplace")
        } catch (e) {
            // console.log(e)
            setLoading(false)
        }
    }

    const unwatch = watchContractEvent(
        {
            address: MarketplaceAddress,
            abi: MarketplaceAbi,
            eventName: "NewListing",
        },
        (log) => console.log(log)
    )
    console.log(clickedNft)
    return (
        <div className="">
            <Navbar />

            <div className="w-[50%]  ml-auto mr-auto text-white mt-[7rem] overflow-hidden">
                {/* Create NFT-: ERC-721  */}
                <div
                    className="flex mb-3 bg-[#8d1cfe] justify-center items-center cursor-pointer w-fit rounded-xl p-1 "
                    onClick={() => router.back()}
                >
                    <BackwardIcon className="w-5 h-5 mr-1" /> Go Back
                </div>
                <div className="w-[60%] overflow-auto">
                    <h1 className="text-5xl font-medium mb-5">List New NFT</h1>
                    <p className="text-gray-500 font-base text-xl mb-8">
                        Single edition on Ethereum{" "}
                    </p>
                    <h2 className="mb-4">Choose wallet</h2>
                    <div className="ethereum-border flex justify-between mb-8 items-start border p-1 border-[#333a4b] rounded-xl">
                        <div className="flex items-center justify-center">
                            <Image src="/Assets/images/fantom-logo.webp" width={40} height={40} />
                            <div className="ml-3">
                                <p></p>
                                <p className="text-gray-500 text-base font-medium">
                                    FTM
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex w-full justify-between items-start">
                        <div>
                            <h1 className="font-medium text-[20px]">
                                Put on marketplace
                            </h1>
                            <p className="text-gray-500 text-[13px]">
                                Set a period of time for which buyers can place
                                bids
                            </p>
                        </div>
                        <Switch
                            {...label}
                            defaultChecked
                            color="secondary"
                            disabled
                        />
                    </div>
                    <input
                        className="set-price-input"
                        name={"Set A Price"}
                        placeholder={"Set A Price"}
                        required={"required"}
                        value={buyoutPrice}
                        onChange={(e) => setBuyoutPrice(e.target.value)}
                    />
                    <p className="text-white-500 text-[20px] font-medium mt-8 mb-3">
                        Duration
                    </p>
                    <FormControl className="w-[45%] bg-[#232128] rounded-2xl text-white"></FormControl>
                    <FormControl className="w-[90%] bg-[#232128] rounded-2xl text-white">
                        <InputLabel
                            id="demo-simple-select-label"
                            className="label text-[#fff]"
                        >
                            Expiration Time
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={endTime}
                            label="Age"
                            onChange={(e) => setEndTime(e.target.value)}
                            className=" text-white rounded-2xl "
                        >
                            <MenuItem value={180}>3 Days</MenuItem>
                            <MenuItem value={300}>5 Days</MenuItem>
                            <MenuItem value={3600}>1 Month</MenuItem>
                            <MenuItem value={7200}>2 Months</MenuItem>
                            <MenuItem value={18000}>5 Months</MenuItem>
                        </Select>
                    </FormControl>
                    <div className="w-full">
                        <h1 className="text-white-500 text-[20px] font-medium mt-8 mb-3">
                            Summary
                        </h1>

                        <div className="flex w-full justify-between">
                            <span className="text-gray-500">
                                Listing Price:{" "}
                            </span>
                            <span className="text-gray-500">
                                {buyoutPrice ? buyoutPrice : "---"} FTM
                            </span>
                        </div>

                        <div className="flex w-full justify-between">
                            <span className="text-gray-500">
                                Creator Earnings:{" "}
                            </span>
                            <span className="text-gray-500">5%</span>
                        </div>
                    </div>
                    <div className="mt-10 mb-20">
                        {!loading ? (
                            <Button text={"Complete Listing"} click={listNft} />
                        ) : (
                            <Button
                                text={
                                    <div className="flex">
                                        <ClipLoader
                                            color={color}
                                            loading={loading}
                                            size={30}
                                            aria-label="Loading Spinner"
                                            data-testid="loader"
                                        />
                                        <p className="mr-2">{loadingText}</p>
                                    </div>
                                }
                            />
                        )}
                    </div>
                </div>
                {/* Preview NFT image  */}
                <div className="preview-image w-[30%] fixed right-[12%] top-[20%] flex flex-col justify-center border-[#333a4b] rounded-xl ">
                    <p className="preview-text mb-3 font-medium">Preview</p>

                    <div className="preview p-5 overflow-hidden">
                        <img
                            src={
                                clickedNft.imageUrl ||
                                clickedNft.nftParams.image
                            }
                            width={100}
                            height={100}
                            className="w-[90%] h-[75%] object-contain"
                        />

                        <h1 className="text-[20px] mt-2 font-semibold">
                            {clickedNft.nftParams.name}
                        </h1>
                        <p className="text-gray-500">FantomHomes</p>

                        {
                            <h1 className="text-[20px] mt-5 font-semibold">
                                {buyoutPrice ? buyoutPrice : "---"} FTM
                            </h1>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateNFT
