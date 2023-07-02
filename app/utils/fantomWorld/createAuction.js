import { Contract, ethers, utils } from "ethers"

import { NFTStorage } from "nft.storage"

import { arrayify } from "ethers/lib/utils"

const API_KEY = process.env.API_KEY
export const createNFt = async (
    provider,
    image,
    address,
    abi,
    description,
    name,
    artist,
    royatlyFee
) => {
    try {
        const client = new NFTStorage({ token: API_KEY })
        const imageData = new Blob([image])

        const signer = provider.getSigner()
        const metadata = {
            description: description,
            external_url: "",
            image: imageData,
            name: name,
        }

        const metaHash = await client.store(metadata)
        console.log("Metadata hast", metaHash)
        const contract = new Contract(address, abi, signer)

        const url = `https://nftstorage.link/ipfs/${metaHash.ipnft}/metadata.json`
        console.log(url)
        const tx = await contract.mint(artist, royatlyFee, url)
        await tx.wait(3)
    } catch (e) {
        console.error(e)
    }
}

export const approveMarketplace = async (
    address,
    abi,
    provider,
    id,
    marketAddress
) => {
    try {
        console.log("Approving.......")
        const contract = new Contract(address, abi, provider)

        const tx = await contract.approve(marketAddress, id)
        await tx.wait()
    } catch (e) {
        console.log(e)
    }
}
