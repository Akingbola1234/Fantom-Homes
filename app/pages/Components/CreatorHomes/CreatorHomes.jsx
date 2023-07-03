import React, { useEffect, useRef, useState } from "react"
import { AiOutlineUpload } from "react-icons/ai"
import { AiOutlineInbox } from "react-icons/ai"
import { Modal, Upload, message } from "antd"
import CollectionsCard from "../CollectionsCard/CollectionsCard"
import {
    paginatedIndexesConfig,
    useAccount,
    useContractInfiniteReads,
    useContractRead,
} from "wagmi"
import {
    FantomHomesAddress,
    FantomHomesAbi,
    MarketplaceAddress,
    MarketplaceAbi,
} from "../../../constants"
import NotListedNft from "../NotListedNFT/NotListedNFT"
import { providers, getDefaultProvider, Contract, ethers } from "ethers"
import Button from "../Button"
import { XCircleIcon } from "@heroicons/react/24/outline"
import {
    Input,
    FormControl,
    InputLabel,
    TextField,
    Switch,
    Select,
    MenuItem,
} from "@mui/material"
import {
    approveMarketplace,
    createNFt,
} from "../../../utils/fantomWorld/createAuction"
import { ClipLoader } from "react-spinners"
import { useRouter } from "next/router"

const CreatorHomes = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const router = useRouter()
    const [nftData, setNftData] = useState([])
    const [getUri, setgetUri] = useState(true)
    const [endTime, setEndTime] = useState(null)
    const [buyoutPrice, setBuyoutPrice] = useState(null)
    const [startTime, setStartTime] = useState(null)
    const [Description, setDescription] = useState("")
    const [Name, setName] = useState("")
    const fileRef = useRef("")
    const color = "#fff"
    const { address } = useAccount()
    const [nftImage, setNftImage] = useState(null)
    const [Roaylty, setRoaylty] = useState(null)
    const [loading, setLoading] = useState(false)
    const [listNft, setListNft] = useState(false)
    const label = { inputProps: { "aria-label": "Color switch demo" } }
    let provider
    if (address) {
        provider = new providers.Web3Provider(window.ethereum)
    }
    const showModal = () => {
        setIsModalOpen(true)
    }
    const handleCancel = () => {
        setIsModalOpen(false)
    }

    async function getTotalSupply() {
        const contract = new Contract(
            FantomHomesAddress,
            FantomHomesAbi,
            provider
        )
        const supply = await contract.totalSupply()
        return Number(supply)
    }

    async function getOwnersOfNft() {
        const ownersArr = []
        const totalSupply = await getTotalSupply()
        const contract = new Contract(
            FantomHomesAddress,
            FantomHomesAbi,
            provider
        )
        for (let i = 0; i < totalSupply; i++) {
            const owner = await contract.ownerOf(i)
            if (owner == address) {
                const obj = { tokenId: i, tokenOwner: owner }
                ownersArr.push(obj)
            }
        }
        return ownersArr
    }
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
    async function getTokensUri() {
        const nftArr = await getOwnersOfNft()
        const contract = new Contract(
            FantomHomesAddress,
            FantomHomesAbi,
            provider
        )
        const tokensArr = []
        for (let i = 0; i < nftArr.length; i++) {
            const element = nftArr[i]
            const tokenUri = await contract.tokenURI(element.tokenId)
            const obj = { tokenId: element.tokenId, tokenUri: tokenUri }
            tokensArr.push(obj)
        }
        return tokensArr
    }

    async function logJSONData() {
        const tokens = await getTokensUri()
        const data = []
        for (let i = 0; i < tokens.length; i++) {
            const element = tokens[i]
            const response = await fetch(element.tokenUri)
            const jsonData = await response.json()
            const thisData = {
                tokenId: element.tokenId,
                nftParams: jsonData,
                assetContract: FantomHomesAddress,
            }
            data.push(thisData)
        }
        setNftData(data)
    }
    useEffect(() => {
        logJSONData()
    }, [address])

    async function handleClick() {
        try {
            setLoading(true)
            await createNFt(
                provider,
                nftImage,
                FantomHomesAddress,
                FantomHomesAbi,
                Description,
                Name,
                address,
                Roaylty * 100
            )
            const signer = provider.getSigner()

            const contract = new Contract(
                FantomHomesAddress,
                FantomHomesAbi,
                signer
            )

            const id = Number(await contract.totalSupply()) - 1

            if (listNft) {
                console.log("Approving....")
                try {
                    await approveMarketplace(
                        FantomHomesAddress,
                        FantomHomesAbi,
                        signer,
                        id,
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
                        assetContract: FantomHomesAddress,
                        tokenId: id,
                        quantity: 1,
                        pricePerToken: ethers.utils.parseEther(buyoutPrice),
                        startTimestamp: StartDate,
                        endTimestamp: EndDate,
                        bool: false,
                    }

                    const tx = await contract.createListing(ListingParameters)
                    await tx.wait(3)
                    setLoading(false)
                    router.push("/page/Marketplace")
                    setLoading(false)
                } catch (e) {
                    setLoading(false)
                }
            }
            setBuyoutPrice("")
            setDescription("")
            setRoaylty("")
            setEndTime("")
            setNftImage("")
            setName("")
            setLoading(false)
            setIsModalOpen(false)
        } catch (e) {
            setLoading(false)
        }
    }
    return (
        <div>
            <div className="creator-text-button">
                <div className="creator-text">
                    <h5>My Collection</h5>
                    <span>{nftData.length} RESULTS</span>
                </div>
                <div className="creator-button">
                    <button onClick={showModal}>
                        <AiOutlineUpload className="upload-icon" /> Upload Homes
                    </button>
                </div>
            </div>
            {/* <CollectionsCard /> */}
            <NotListedNft data={nftData} />
            <Modal
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
                centered={true}
            >
                <h2 className="mb-4 text-[#fff]">Upload File</h2>
                <div className=" border-dashed border-2 mb-4 border-[#333a4b] rounded-xl p-7">
                    {!nftImage ? (
                        <div className="flex flex-col w-full justify-center items-center">
                            <h1 className="text-gray-500 text-sm">
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
                            <img
                                src={nftImage}
                                className="w-[90%] h-full object-contain"
                            />
                            <div>
                                <XCircleIcon
                                    className="h-7 w-7 cursor-pointer text-gray-400"
                                    onClick={removeImage}
                                />
                            </div>
                        </div>
                    )}
                </div>

                <FormControl className="w-full bg-[#232128] rounded-2xl text-white">
                    <TextField
                        label={"Name"}
                        required
                        className="text-[#fff] mb-7 "
                        color="primary"
                        onChange={(e) => setName(e.target.value)}
                        value={Name}
                    />

                    <TextField
                        label={"Description"}
                        required
                        className="text-[#fff]"
                        color="primary"
                        onChange={(e) => setDescription(e.target.value)}
                        multiline
                        value={Description}
                    />

                    <TextField
                        label={"Royalty"}
                        required
                        className="text-[#fff] mt-7 flex-grow"
                        color="primary"
                        onChange={(e) => setRoaylty(e.target.value)}
                        value={Roaylty}
                    />

                    <div className="mt-8 flex w-full justify-between items-start">
                        <div>
                            <h1 className="font-medium text-[20px]">
                                Put on marketplace
                            </h1>
                            <p className="text-gray-500 text-[13px]">
                                Set a period of time for which buyers can buy
                            </p>
                        </div>
                        <Switch
                            {...label}
                            onChange={() => setListNft((prev) => !prev)}
                            color="secondary"
                        />
                    </div>

                    {listNft && (
                        <div className="flex flex-col w-full">
                            <div className="w-full flex flex-grow ">
                                <TextField
                                    label={"Price"}
                                    required
                                    className="text-[#fff] mr-5 flex-grow"
                                    color="primary"
                                    onChange={(e) =>
                                        setBuyoutPrice(e.target.value)
                                    }
                                    value={buyoutPrice}
                                />

                                <FormControl className="w-[49%]  bg-[#232128]  text-white">
                                    <InputLabel
                                        id="demo-simple-select-label"
                                        className="label text-[#fff]"
                                    >
                                        Duration
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={endTime}
                                        label="Duration"
                                        onChange={(e) =>
                                            setEndTime(e.target.value)
                                        }
                                        className=" text-white"
                                    >
                                        <MenuItem value={180}>3 Days</MenuItem>
                                        <MenuItem value={300}>5 Days</MenuItem>
                                        <MenuItem value={3600}>
                                            1 Month
                                        </MenuItem>
                                        <MenuItem value={7200}>
                                            2 Months
                                        </MenuItem>
                                        <MenuItem value={18000}>
                                            5 Months
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

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
                                    <span className="text-gray-500">
                                        {Roaylty} %
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </FormControl>

                <div className="mt-10 mb-20">
                    {!loading ? (
                        <Button
                            text={"Create Home"}
                            click={() => {
                                handleClick()
                            }}
                        />
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
                                </div>
                            }
                        />
                    )}
                </div>
            </Modal>
        </div>
    )
}

export default CreatorHomes
