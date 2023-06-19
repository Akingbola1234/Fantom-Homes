const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("FantomHomes", () => {
    const METADATA_URL = "ipfs://CID/"
    const ROYALTY_FEE = 500 // 5%

    let deployer, artist, minter, fantomHome

    beforeEach(async () => {
        ;[deployer, artist, minter] = await ethers.getSigners()

        const FantomLand = await ethers.getContractFactory("FantomHomes")

        fantomHome = await FantomLand.deploy()
    })

    describe("Deployment", () => {
        it("Returns the name", async () => {
            const result = await fantomHome.name()
            expect(result).to.equal("FantomHomes")
        })

        it("Returns the symbol", async () => {
            const result = await fantomHome.symbol()
            expect(result).to.equal("FTH")
        })
    })
})
