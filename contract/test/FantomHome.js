const {
    time,
    loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers")
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs")
const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("FantomHome", () => {
    let owner, addr1, addr2, FantomHome
    const propertyId = 1
    const price = ethers.parseEther("1")
    const propertyAddress = "Shomolu"
    const documents = "docs"
    beforeEach(async () => {
        ;[owner, addr1, addr2] = await ethers.getSigners()
        FantomHome = await hre.ethers.deployContract("FantomHome")

        await FantomHome.waitForDeployment()
    })

    describe("Listing", () => {
        it("list the property correctly", async () => {
            const tx = await FantomHome.connect(addr1).listProperty(
                propertyId,
                propertyAddress,
                price,
                documents
            )

            expect(await tx)
                .to.emit(FantomHome, "PropertyListed")
                .withArgs(propertyId, propertyAddress, price, documents)
        })

        it("Should not list property with the same id", async () => {
            const tx = await FantomHome.connect(addr1).listProperty(
                propertyId,
                propertyAddress,
                price,
                documents
            )

            expect(await tx).to.revertedWith("FantomHome_PropertyListed")
        })
    })
})
