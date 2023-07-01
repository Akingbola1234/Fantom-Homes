import { providers, Contract } from "ethers"
import React, { createContext, useEffect, useState } from "react"
import {
    FantomAcc,
    FantomHomesAbi,
    FantomHomesAddress,
    MarketplaceAbi,
    MarketplaceAddress,
} from "../constants"
import { data } from "autoprefixer"
import { useAccount, useContractRead } from "wagmi"

export const HookContext = createContext()
const HookProvider = ({ children }) => {
    const [clickedNft, setClickedNft] = useState([0])
    const [moreDetails, setMoreDetails] = useState(null)
    const [homesNft, setHomesNft] = useState(null)
    const [wearableNft, setWearableNft] = useState(null)
    const { address } = useAccount()
    const [data, setData] = useState(null)
    let provider
    if (address) {
        provider = new providers.Web3Provider(window.ethereum)
    }
    const totalSupply = useContractRead({
        address: MarketplaceAddress,
        abi: MarketplaceAbi,
        functionName: "totalListings",
    })
    const _totalSupply = Number(totalSupply.data) - 1
    console.log(Number(totalSupply.data))

    const mlootContractConfig = {
        address: MarketplaceAddress,
        abi: MarketplaceAbi,
    }

    const listings = useContractRead({
        address: MarketplaceAddress,
        abi: MarketplaceAbi,
        functionName: "getAllValidListings",
        args: [0, _totalSupply],
        onSuccess(data) {
            console.log("Success", data)
            setData(listings.data)
        },
    })

    async function logJSONData(uri) {
        const response = await fetch(uri)
        const jsonData = await response.json()
        return jsonData
    }
    async function getTokensUri(element) {
        try {
            const address =
                element.assetContract == FantomHomesAddress
                    ? FantomHomesAddress
                    : FantomAcc
            const signer = provider.getSigner()
            const contract = new Contract(address, FantomHomesAbi, signer)

            const tx = await contract.tokenURI(element.tokenId)
            console.log(tx)
            return tx
        } catch (e) {
            console.log(e)
        }
    }
    async function getToken() {
        const HomesArr = []
        const AccArr = []
        console.log(listings.data)
        if (data) {
            for (let i = 0; i <= data.length; i++) {
                try {
                    if (data[i].assetContract == FantomHomesAddress) {
                        const uri = await getTokensUri(data[i])
                        const _uri = await logJSONData(uri)
                        const token = { ...data[i], _uri }
                        HomesArr.push(token)
                    }
                    if (data[i].assetContract == FantomAcc) {
                        const uri = await getTokensUri(data[i])
                        const _uri = await logJSONData(uri)
                        const token = { ...data[i], _uri }
                        AccArr.push(token)
                    }
                } catch (e) {
                    console.log(e)
                }
            }
        }

        setHomesNft(HomesArr)
        setWearableNft(AccArr)
        return { HomesArr, AccArr }
    }

    return (
        <HookContext.Provider
            value={{
                clickedNft,
                setClickedNft,
                moreDetails,
                setMoreDetails,
                homesNft,
                wearableNft,
                getToken,
            }}
        >
            {children}
        </HookContext.Provider>
    )
}

export default HookProvider
