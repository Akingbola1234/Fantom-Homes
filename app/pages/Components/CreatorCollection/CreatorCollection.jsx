import React, { useEffect, useState } from "react"
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
import { FantomAcc, FantomAccAbi } from "../../../constants"
import NotListedNft from "../NotListedNFT/NotListedNFT"
import { providers, getDefaultProvider, Contract } from "ethers"

const { Dragger } = Upload
const props = {
    name: "file",
    multiple: true,
    action: "https://www.mocky.io/v2/",
    onChange(info) {
        const { status } = info.file
        if (status !== "uploading") {
            console.log(info.file, info.fileList)
        }
        if (status === "done") {
            message.success(`${info.file.name} file uploaded successfully`)
        } else if (status === "error") {
            message.error(`${info.files.name} file upload failed`)
        }
    },
    onDrop(e) {
        console.log("Dropped files", e.dataTransfer.file)
    },
}

const CreatorCollection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [nftData, setNftData] = useState([])
    const [getUri, setgetUri] = useState(true)
    const { address } = useAccount()
    const provider = new providers.Web3Provider(window.ethereum)
    const showModal = () => {
        setIsModalOpen(true)
    }
    const handleCancel = () => {
        setIsModalOpen(false)
    }

    async function getTotalSupply() {
        const contract = new Contract(FantomAcc, FantomAccAbi, provider)
        const supply = await contract.totalSupply()
        return Number(supply)
    }

    async function getOwnersOfNft() {
        const ownersArr = []
        const totalSupply = await getTotalSupply()
        const contract = new Contract(FantomAcc, FantomAccAbi, provider)
        for (let i = 0; i < totalSupply; i++) {
            const owner = await contract.ownerOf(i)
            if (owner == address) {
                const obj = { tokenId: i, tokenOwner: owner }
                ownersArr.push(obj)
            }
        }
        return ownersArr
    }

    async function getTokensUri() {
        const nftArr = await getOwnersOfNft()
        const contract = new Contract(FantomAcc, FantomAccAbi, provider)
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
            }
            console.log(thisData)
            data.push(thisData)
        }
        console.log(data)
        setNftData(data)
    }
    useEffect(() => {
        logJSONData()
    }, [address])

    return (
        <div>
            <div className="creator-text-button">
                <div className="creator-text">
                    <h5>My Collection</h5>
                    <span>{nftData.length} RESULTS</span>
                </div>
                <div className="creator-button">
                    <button onClick={showModal}>
                        <AiOutlineUpload className="upload-icon" /> Upload
                        Collection
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
                <h5 className="creator-modal-text">Upload Collections</h5>
                <span className="creator-modal-span">
                    You can upload your Creative Collections on FantomWorld
                </span>
                <Dragger {...props} className="drag-drop">
                    <p className="ant-upload-drag-icon">
                        <AiOutlineInbox />
                    </p>
                    <p className="ant-upload-text">
                        Click or drag file to this area to upload
                    </p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibited
                        from uploading company data or other banned files.
                    </p>
                </Dragger>
            </Modal>
        </div>
    )
}

export default CreatorCollection
