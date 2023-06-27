import React, { useEffect, useState } from "react";
import { AiOutlineInbox } from "react-icons/ai";
import { Modal, Upload, message } from "antd";
import { AiOutlineUpload } from "react-icons/ai";
import HomesCard from "../HomeCard/HomesCard";
import {
  useContractInfiniteReads,
  useContractRead,
  paginatedIndexesConfig,
  useAccount,
} from "wagmi";
import { FantomHomesAbi, FantomHomesAddress } from "../../../constants";
import NotListedNft from "../NotListedNFT/NotListedNFT";

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
const CreatorHomes = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [nftData, setNftData] = useState([])
    const [getUri, setgetUri] = useState(true)
    const { address } = useAccount()
    const provider = new providers.Web3Provider(window.ethereum)

    console.log(provider.getSigner(address))

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
  function getAddressTokens() {
    const tokensArr = [];
    for (let i = 0; i < data.pages[0].length; i++) {
      if (data.pages[0][i].result == address) {
        const fetchUri = useContractRead({
          address: FantomHomesAddress,
          abi: FantomHomesAbi,
          functionName: "tokenURI",
          args: [i],
        });
        const token = {
          tokenId: i,
          tokenUri: fetchUri.data,
        };
        tokensArr.push(token);
      }
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

    const showModal = () => {
        setIsModalOpen(true)
    }
    const handleCancel = () => {
        setIsModalOpen(false)
    }
    logJSONData();
  }

  return (
    <div className={"creator-homes-container"}>
      <div className="creator-text-button">
        <div className="creator-text">
          <h5>My Homes</h5>
          <span>{nftData.length} RESULTS</span>
        </div>
        <div className="creator-button">
          <button onClick={showModal}>
            <AiOutlineUpload className="upload-icon" /> Upload Homes
          </button>
        </div>
      </div>
      {/* <HomesCard /> */}
      <NotListedNft data={nftData} />
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered={true}
      >
        <h5 className="creator-modal-text">Upload Homes</h5>
        <span className="creator-modal-span">
          You can upload your Creative Homes on FantomWorld
        </span>
        <Dragger {...props} className="drag-drop">
          <p className="ant-upload-drag-icon">
            <AiOutlineInbox />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from
            uploading company data or other banned files.
          </p>
        </Dragger>
      </Modal>
    </div>
  );
};

export default CreatorHomes;
