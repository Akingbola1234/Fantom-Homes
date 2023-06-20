const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("MarketPlace", () => {
    let deployer, minter, artist, buyer, fantomHome, MarketPlace
    beforeEach(async () => {
        ;[deployer, minter, artist, buyer] = await ethers.getSigner()

        const FantomHomes = ethers.getContractFactory("FantomHomes")
        fantomHome = await FantomHomes.deploy()

        console.log(await fantomHome.target)
    })
})
