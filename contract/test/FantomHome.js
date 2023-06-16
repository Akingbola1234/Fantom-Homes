const {
    time,
    loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers")
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs")
const { expect, assert } = require("chai")
const { ethers } = require("hardhat")
const { log } = require("console")

describe("FantomHome", () => {
    let owner, addr1, addr2, FantomHome, tx
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
        beforeEach(async () => {
            tx = await FantomHome.connect(addr1).listProperty(
                propertyId,
                propertyAddress,
                price,
                documents
            )
        })
        it("list the property correctly", async () => {
            expect(await tx)
                .to.emit(FantomHome, "PropertyListed")
                .withArgs(propertyId, propertyAddress, price, documents)
        })

        it("Should not list property with the same id", async () => {
            try {
                tx = await FantomHome.connect(addr1).listProperty(
                    propertyId,
                    propertyAddress,
                    price,
                    documents
                )
            } catch (e) {
                expect(tx).to.be.revertedWith("FantomHome_PropertyListed")
            }
        })
    })

    describe("Purchasing", () => {
        beforeEach(async () => {
            tx = await FantomHome.connect(addr1).listProperty(
                propertyId,
                propertyAddress,
                price,
                documents
            )
        })

        it("Should purchase property", async () => {
            tx = await FantomHome.connect(addr2).purchaseProperty(propertyId, {
                value: price,
            })
            expect(tx)
                .to.emit(FantomHome, "PropertyPurchased")
                .withArgs(propertyId, price, addr2.address)
        })

        it("Should fail if msg.value is less than price", async () => {
            try {
                tx = await FantomHome.connect(addr2).purchaseProperty(
                    propertyId,
                    {
                        value: ethers.parseEther("0.001"),
                    }
                )
            } catch (e) {
                expect(tx).to.be.revertedWith("FantomHome_InsufficientPayment")
            }
        })

        it("Should Not purchase sold property", async () => {
            try {
                tx = await FantomHome.connect(addr2).purchaseProperty(
                    propertyId,
                    {
                        value: price,
                    }
                )

                tx = await FantomHome.connect(addr2).purchaseProperty(
                    propertyId,
                    {
                        value: price,
                    }
                )
            } catch (e) {
                expect(tx).to.be.revertedWith("FantomHome_PropertyNotAvailable")
            }
        })

        it("Should increase agent balance", async () => {
            const agentStartingBalance = await ethers.provider.getBalance(addr1)
            const buyerStartingBalance = await ethers.provider.getBalance(addr2)

            tx = await FantomHome.connect(addr2).purchaseProperty(propertyId, {
                value: price,
            })
            const agentEndingBalance = await ethers.provider.getBalance(addr1)
            const buyerEndingBalance = await ethers.provider.getBalance(addr2)
            assert(agentEndingBalance, agentStartingBalance + price)
            assert(buyerEndingBalance, buyerStartingBalance - price)
        })
    })
})
