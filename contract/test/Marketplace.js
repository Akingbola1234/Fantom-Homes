// const { expect } = require("chai")
// const { ethers } = require("hardhat")

// describe("MarketPlace", () => {
//     let deployer,
//         minter,
//         artist,
//         buyer,
//         fantomHome,
//         marketPlace,
//         tx,
//         MarketPlace

//     const ROYALTY_FEE = 500
//     const COST = ethers.parseEther("1")
//     const startTimestamp = Math.floor(Date.now() / 1000) + 300
//     const endTimestamp = Math.floor(startTimestamp + 500)

//     beforeEach(async () => {
//         ;[deployer, minter, artist, buyer] = await ethers.getSigner()

//         const FantomHomes = await hre.ethers.getContractFactory("FantomHomes")
//         await FantomHomes.waitForDeployment()

//         console.log(await FantomHomes.target)

//         MarketPlace = await hre.ethers.getContractFactory("Marketplace")

//         marketPlace = await MarketPlace.waitForDeployment()

//         tx = await FantomHomes.connect(minter).mint(artist, ROYALTY_FEE)
//         await tx.wait()
//         tx = await FantomHomes.connect(minter).approve(marketPlace.target, 0)

//         const assetContract = await fantomHome.target
//         const LISTINGPARAMETERS = {
//             assetContract: assetContract,
//             tokenId: 0,
//             quantity: 1,
//             pricePerToken: COST,
//             startTimestamp,
//             endTimestamp,
//             reserved: false,
//         }

//         tx = await marketPlace.connect(minter).createListing(LISTINGPARAMETERS)

//         await tx.wait()
//         console.log(tx)

//         console.log(await marketPlace.target)
//     })

//     describe("Listing", () => {
//         expect(tx).to.emit(MarketPlace, "NewListing")
//     })
// })

const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("FantomHomes", () => {
    const METADATA_URL = "ipfs://CID/"
    const ROYALTY_FEE = 500 // 5%
    const COST = ethers.parseEther("1")
    const startTimestamp = Math.floor(Date.now() / 1000) + 300
    const endTimestamp = Math.floor(startTimestamp + 500)

    let deployer, artist, minter, fantomHomes, marketPlace, tx, MarketPlace

    beforeEach(async () => {
        ;[deployer, artist, minter] = await ethers.getSigners()

        const FantomHomes = await ethers.getContractFactory("FantomHomes")

        fantomHomes = await FantomHomes.deploy()

        MarketPlace = await ethers.getContractFactory("Marketplace")

        marketPlace = await MarketPlace.deploy()

        tx = await fantomHomes
            .connect(minter)
            .mint(artist.address, ROYALTY_FEE, METADATA_URL)
        await tx.wait()

        tx = await fantomHomes.connect(minter).approve(marketPlace.target, 0)

        const assetContract = fantomHomes.target
        const LISTINGPARAMETERS = {
            assetContract: assetContract,
            tokenId: 0,
            quantity: 1,
            pricePerToken: COST,
            startTimestamp,
            endTimestamp,
            reserved: false,
        }

        tx = await marketPlace.connect(minter).createListing(LISTINGPARAMETERS)

        await tx.wait()
        // console.log(tx)
    })

    describe("Listing", () => {
        it("Should list NFT", async () => {
            expect(tx).to.emit(MarketPlace, "NewListing").withArgs({
                listingId: 0,
                listingCreator: minter.address,
                assetContract: fantomHomes.target,
                tokenId: 0,
                pricePerToken: COST,
                startTimestamp: startTimestamp,
                endTimestamp: endTimestamp,
                reserved: true,
                status: 0,
            })
        })

        it("Returns the symbol", async () => {
            const result = await fantomHomes.symbol()
            expect(result).to.equal("FTH")
        })
    })
})
