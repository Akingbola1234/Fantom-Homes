const { expect } = require("chai")
const { ethers, network } = require("hardhat")

describe("FantomHomes", () => {
    const METADATA_URL = "ipfs://CID/"
    const ROYALTY_FEE = 500 // 5%
    const COST = ethers.parseEther("1")
    const startTimestamp = Math.floor(Date.now() / 1000) + 300
    const endTimestamp = Math.floor(startTimestamp + 500)

    let deployer,
        artist,
        minter,
        buyer,
        fantomHomes,
        marketPlace,
        tx,
        MarketPlace,
        fantomAcc

    beforeEach(async () => {
        ;[deployer, artist, minter, buyer] = await ethers.getSigners()

        const FantomHomes = await ethers.getContractFactory("FantomHomes")
        fantomHomes = await FantomHomes.deploy()

        const FantomAcc = await ethers.getContractFactory("FantomAcc")
        fantomAcc = await FantomAcc.deploy()

        MarketPlace = await ethers.getContractFactory("Marketplace")
        marketPlace = await MarketPlace.deploy()

        tx = await fantomHomes
            .connect(minter)
            .mint(artist.address, ROYALTY_FEE, METADATA_URL)
        await tx.wait()

        tx = await fantomAcc
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

        it("endTime must be greater than startTime", async () => {
            try {
                const assetContract = fantomHomes.target
                const LISTINGPARAMETERS = {
                    assetContract: assetContract,
                    tokenId: 0,
                    quantity: 1,
                    pricePerToken: COST,
                    startTimestamp,
                    endTimestamp: startTimestamp,
                    reserved: false,
                }

                tx = await marketPlace
                    .connect(minter)
                    .createListing(LISTINGPARAMETERS)

                await tx.wait()
            } catch (e) {
                expect(tx).to.be.revertedWith("Marketplace_InvalidEndTimeStamp")
            }
        })

        it("Should be owner of NFT", async () => {
            try {
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
                tx = await marketPlace
                    .connect(deployer)
                    .createListing(LISTINGPARAMETERS)
            } catch (e) {
                expect(tx).to.be.revertedWith("Marketplace_NotOwnerOfToken")
            }
        })

        it("Should approve Marketplace to transfer NFTs", async () => {
            try {
                tx = await fantomHomes
                    .connect(minter)
                    .mint(artist.address, ROYALTY_FEE, METADATA_URL)
                await tx.wait()

                const assetContract = fantomHomes.target
                let LISTINGPARAMETERS = {
                    assetContract: assetContract,
                    tokenId: 1,
                    quantity: 1,
                    pricePerToken: COST,
                    startTimestamp,
                    endTimestamp,
                    reserved: false,
                }

                tx = await marketPlace
                    .connect(minter)
                    .createListing(LISTINGPARAMETERS)

                await tx.wait()
            } catch (e) {
                expect(tx).to.be.revertedWith("Marketplace_NotOwnerOfToken")
            }
        })
    })

    describe("Update Listing", () => {
        beforeEach(async () => {})
        it("Should be the creator", async () => {
            try {
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
                tx = await marketPlace
                    .connect(deployer)
                    .updateListing(0, LISTINGPARAMETERS)
            } catch (e) {
                expect(tx).to.be.revertedWith("Marketplace_NotOwnerOfToken")
            }
        })

        it("listing endtime should not have been elapsed", async () => {
            await network.provider.send("evm_increaseTime", [800 + 2])
            try {
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
                tx = await marketPlace
                    .connect(minter)
                    .updateListing(0, LISTINGPARAMETERS)
            } catch (e) {
                expect(tx).to.be.revertedWith("Marketplace_ListingExpired")
            }
        })

        it("Should be listing assert Contract", async () => {
            try {
                const assetContract = fantomHomes.target
                const LISTINGPARAMETERS = {
                    assetContract: assetContract,
                    tokenId: 1,
                    quantity: 1,
                    pricePerToken: COST,
                    startTimestamp,
                    endTimestamp,
                    reserved: false,
                }
                tx = await marketPlace
                    .connect(minter)
                    .updateListing(0, LISTINGPARAMETERS)
            } catch (e) {
                expect(tx).to.be.revertedWith(
                    "Marketplace_CannotUpdateNonListedToken"
                )
            }
        })

        it("endTime must be greater than startTime", async () => {
            try {
                const assetContract = fantomHomes.target
                const LISTINGPARAMETERS = {
                    assetContract: assetContract,
                    tokenId: 0,
                    quantity: 1,
                    pricePerToken: COST,
                    startTimestamp,
                    endTimestamp: startTimestamp,
                    reserved: false,
                }

                tx = await marketPlace
                    .connect(minter)
                    .updateListing(0, LISTINGPARAMETERS)

                await tx.wait()
            } catch (e) {
                expect(tx).to.be.revertedWith("Marketplace_InvalidEndTimeStamp")
            }
        })

        it("Should only update existing listing", async () => {
            try {
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
                tx = await marketPlace
                    .connect(minter)
                    .updateListing(1, LISTINGPARAMETERS)
            } catch (e) {
                expect(tx).to.be.revertedWith("Marketplace_InvalidListing")
            }
        })

        it("only listing creator", async () => {
            try {
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
                tx = await marketPlace
                    .connect(deployer)
                    .updateListing(0, LISTINGPARAMETERS)
                expect(tx).to.be.revertedWith("Marketplace_NotListingCreator")
            } catch (e) {}
        })

        it("Should update listing", async () => {
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
            tx = await marketPlace
                .connect(minter)
                .updateListing(0, LISTINGPARAMETERS)
            expect(tx)
                .to.emit(MarketPlace, "UpdatedListing")
                .withArgs(
                    minter.address,
                    0,
                    fantomHomes.target,
                    LISTINGPARAMETERS
                )
        })
    })

    describe("Cancel Listing", () => {
        it("Only listing creator", async () => {
            try {
                tx = await marketPlace.connect(deployer).cancelListing(0)
                await tx.wait()
            } catch (e) {
                expect(tx).to.be.revertedWith("Marketplace_NotListingCreator")
            }
        })

        it("Only existing listing", async () => {
            try {
                tx = await marketPlace.connect(deployer).cancelListing(1)
                await tx.wait()
            } catch (e) {
                expect(tx).to.be.revertedWith("Marketplace_InvalidListing")
            }
        })

        it("Should cancel listing", async () => {
            tx = await marketPlace.connect(minter).cancelListing(0)
            await tx.wait()

            expect(tx)
                .to.emit(MarketPlace, "CancelledListing")
                .withArgs(minter.address, 0)
        })
    })

    describe("Buy From Listing", () => {
        beforeEach(async () => {
            tx = await marketPlace.connect(buyer).buyFromListing(0)
        })

        it("Send royalFee to artist", async () => {
            const result = await ethers.provider.getBalance(artist.address)
            expect(result).to.be.equal("10000050000000000000000") // 0.05 ETH (5% of 1 ETH)
        })

        // it("Should not buy when sales is over", async () => {
        //     try {
        //         await network.provider.send("evm_increaseTime", [820])
        //         tx = await marketPlace.connect(buyer).buyFromListing(0)
        //     } catch (e) {
        //         expect(tx).to.be.revertedWith("Marketplace_NotWithinSaleWindow")
        //     }
        // })
    })
})
