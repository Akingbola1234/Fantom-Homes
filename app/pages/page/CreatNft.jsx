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
import { BigNumber, ethers, utils } from "ethers"
import { useRouter } from "next/router"
import { ClipLoader } from "react-spinners"
import { HookContext } from "../../context/Hook"

const CreateNFT = () => {
    const label = { inputProps: { "aria-label": "Color switch demo" } }
    const fileRef = useRef("")
    const zero = BigNumber.from(0)
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [nftImage, setNftImage] = useState("")
    const [name, setName] = useState("")
    const [buyoutPrice, setBuyoutPrice] = useState("")
    const [symbol, setSymbol] = useState("")
    const [description, setDescription] = useState("")
    const [imageParam, setImageParam] = useState("")
    const [bid, setBid] = useState(zero)
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
                    <BackwardIcon className="w-5 h-5" /> Go Back
                </div>
                <div className="w-[60%] overflow-auto">
                    <h1 className="text-5xl font-medium mb-5">List New NFT</h1>
                    <p className="text-gray-500 font-base text-xl mb-8">
                        Single edition on Ethereum{" "}
                    </p>
                    <h2 className="mb-4">Choose wallet</h2>
                    <div className="ethereum-border flex justify-between mb-8 items-start border p-4 border-[#333a4b] rounded-xl">
                        <div className="flex items-center justify-center">
                            <Image src="/ethre.webp" width={40} height={40} />
                            <div className="ml-3">
                                <p></p>
                                <p className="text-gray-500 text-base font-medium">
                                    Ethereum
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* <h2 className="mb-4">Upload File</h2>
                    <div className=" border-dashed border-2 border-[#333a4b] rounded-xl p-7">
                        {!nftImage ? (
                            <div className="flex flex-col w-full justify-center items-center">
                                <h1 className="text-gray-500">
                                    PNG,GIF,WEBP,MP4 or MP3. Max 100mb
                                </h1>
                                <div
                                    className="px-3 py-2 hover:bg-blue-500 active:scale-90 transition-all duration-200 bg-[#313337] rounded-xl mt-3 cursor-pointer"
                                    onClick={() => fileRef.current.click()}
                                >
                                    <span>Choose File</span>
                                    <input
                                        hidden
                                        type="file"
                                        ref={fileRef}
                                        onChange={addImage}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="w-full h-[15rem] flex overflow-hidden">
                                <Image
                                    src={nftImage}
                                    width={100}
                                    height={100}
                                    className="w-[90%] object-cover"
                                />
                                <div>
                                    <XCircleIcon
                                        className="h-7 w-7 cursor-pointer text-gray-400"
                                        onClick={removeImage}
                                    />
                                </div>
                            </div>
                        )}
                    </div> */}
                    {/* <FormInput
                        name={"Display Name"}
                        placeholder={"Enter Collection name"}
                        required={"required"}
                        nftParam={name}
                        setNftParam={setName}
                    /> */}
                    {/* <p className="text-gray-500 text-[13px] font-medium mt-3">
                        Token Name Cannot be changed in future
                    </p> */}
                    {/* <FormInput
                        name={"Symbol"}
                        placeholder={"Enter Token Symbol"}
                        required={"required"}
                        nftParam={symbol}
                        setNftParam={setSymbol}
                    /> */}

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
                    <input className="set-price-input"
                     name={"Set A Price"}
                     placeholder={"Set A Price"}
                     required={"required"}
                     nftParam={buyoutPrice}
                     setNftParam={setBuyoutPrice}
                    />
                    {/* <FormInput
                        name={"Minimum Bid"}
                        placeholder={"0.3 Eth"}
                        nftParam={bid}
                        setNftParam={setBid}
                    /> */}
                    <p className="text-white-500 text-[20px] font-medium mt-8 mb-3">
                        Duration
                    </p>

                    <FormControl className="w-[45%] bg-[#232128] rounded-2xl text-white">
                        <InputLabel
                            id="demo-simple-select-label"
                            className="label"
                        >
                            Starting Time
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={startTime}
                            label="Age"
                            onChange={(e) => setStartTime(e.target.value)}
                            className=" text-white rounded-2xl  border-[#333a4b]"
                        >
                            <MenuItem value={0}>Now</MenuItem>
                            <MenuItem value={60}>1 Minutes</MenuItem>
                            <MenuItem value={300}>5 Minutes</MenuItem>
                            <MenuItem value={3600}>1 hour</MenuItem>
                            <MenuItem value={7200}>2 hours</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className="w-[45%] ml-3 bg-[#232128] rounded-2xl text-white">
                        <InputLabel
                            id="demo-simple-select-label"
                            className="label"
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
                            <MenuItem value={180}>3 Minutes</MenuItem>
                            <MenuItem value={300}>5 Minutes</MenuItem>
                            <MenuItem value={3600}>1 hour</MenuItem>
                            <MenuItem value={7200}>2 hours</MenuItem>
                            <MenuItem value={18000}>5 hours</MenuItem>
                            <MenuItem value={86400}>1 Day</MenuItem>
                            <MenuItem value={432000}>5 Days</MenuItem>
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
                            <span className="text-gray-500">5 ETH</span>
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
                            <Button text={"Complete Listing"} />
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
                    {!clickedNft.nftParams ? (
                        <div className="preview">
                            <h1 className="text-gray-500">
                                Upload file and choose collection to preview
                                your brand new NFT
                            </h1>
                        </div>
                    ) : (
                        <div className="preview p-5 overflow-hidden">
                            <img
                                src={clickedNft.nftParams.image}
                                width={100}
                                height={100}
                                className="w-[90%] h-[75%] object-cover"
                            />

                            <h1 className="text-[20px] mt-2 font-semibold">
                                {clickedNft.nftParams.name}
                            </h1>
                            <p className="text-gray-500">FantomHomes</p>

                            <h1 className="text-[20px] mt-7 font-semibold">
                                5 FTM
                            </h1>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CreateNFT
