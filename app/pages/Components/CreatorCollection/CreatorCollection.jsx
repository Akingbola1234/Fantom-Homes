import React, { useState } from "react"
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
    const totalSupply = useContractRead({
        address: FantomAcc,
        abi: FantomAccAbi,
        functionName: "totalSupply",
    })
    const mlootContractConfig = {
        address: FantomAcc,
        abi: FantomAccAbi,
    }
    const { data } = useContractInfiniteReads({
        ...paginatedIndexesConfig(
            (index) => {
                return [
                    {
                        ...mlootContractConfig,
                        functionName: "ownerOf",
                        args: [index],
                    },
                ]
            },
            {
                start: 0,
                perPage: Number(totalSupply.data),
                direction: "increment",
            }
        ),
    })
    const showModal = () => {
        setIsModalOpen(true)
    }
    const handleCancel = () => {
        setIsModalOpen(false)
    }

    function getAddressTokens() {
        const tokensArr = []
        for (let i = 0; i < data.pages[0].length; i++) {
            if (data.pages[0][i].result == address) {
                const fetchUri = useContractRead({
                    address: FantomAcc,
                    abi: FantomAccAbi,
                    functionName: "tokenURI",
                    args: [i],
                })
                const token = {
                    tokenId: i,
                    tokenUri: fetchUri.data,
                }
                tokensArr.push(token)
            }
        }

        console.log(tokensArr)
        return tokensArr
    }
    const tokens = getAddressTokens()

    if (address && getUri) {
        async function logJSONData() {
            const data = []
            for (let i = 0; i < tokens.length; i++) {
                const element = tokens[i]
                const response = await fetch(element.tokenUri)
                const jsonData = await response.json()
                const thisData = {
                    tokenId: element.tokenId,
                    nftParams: jsonData,
                }
                data.push(thisData)

                if (data.length == tokens.length) {
                    setgetUri(false)
                }
            }

            setNftData(data)
        }
        logJSONData()
    }
    return (
        <div>
            <div className="creator-text-button">
                <div className="creator-text">
                    <h5>My Collection</h5>
                    <span>0 RESULTS</span>
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
