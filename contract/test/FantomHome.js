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

        it("Should be awating purchase", async () => {
            assert.equal(`${await FantomHome.state()}`, "0")
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

            assert.equal(`${await FantomHome.state()}`, "1")
        })

        it("Should fail if seller tries to purchase", async () => {
            try {
                tx = await FantomHome.connect(addr1).purchaseProperty(
                    propertyId,
                    {
                        value: price,
                    }
                )
            } catch (e) {
                expect(tx).to.be.revertedWith("FantomHome_OnlyBuyer")
            }
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
                expect(tx).to.be.revertedWith("FantomHome_NotAllowed")
            } catch (e) {}
        })
    })

    describe("Confirm Delivery", () => {
        beforeEach(async () => {
            tx = await FantomHome.connect(addr1).listProperty(
                propertyId,
                propertyAddress,
                price,
                documents
            )
            tx = await FantomHome.connect(addr2).purchaseProperty(propertyId, {
                value: price,
            })
        })

        it("Should confirm delivery if satisfied", async () => {
            tx = await FantomHome.connect(addr2).confirm_delivery(propertyId)

            assert.equal(`${await FantomHome.state()}`, "2")
        })

        it("Should only be called by buyer", async () => {
            try {
                tx = await FantomHome.connect(addr1).confirm_delivery(
                    propertyId
                )
            } catch (e) {
                expect(tx).to.be.revertedWith("FantomHome_OnlyBuyer")
            }
        })

        it("Should fail if state is not await_delivery", async () => {
            let txx
            tx = await FantomHome.connect(addr2).confirm_delivery(propertyId)

            assert.equal(`${await FantomHome.state()}`, "2")
            try {
                txx = await FantomHome.connect(addr2).confirm_delivery()
            } catch (er) {
                expect(txx).to.be.revertedWith("FantomHome_NotAllowed")
            }
        })

        it("Should increase contract balance", async () => {
            const fantomBal = await ethers.provider.getBalance(
                FantomHome.target
            )
            assert.equal(fantomBal, price)
        })

        it("Should increase buyer balance", async () => {
            const agentStartingBalance = await ethers.provider.getBalance(addr1)
            const buyerStartingBalance = await ethers.provider.getBalance(addr2)

            tx = await FantomHome.connect(addr2).confirm_delivery(propertyId)

            const agentEndingBalance = await ethers.provider.getBalance(addr1)
            const buyerEndingBalance = await ethers.provider.getBalance(addr2)

            assert.equal(agentEndingBalance, agentStartingBalance + price)
        })
    })

    describe("Return Payment", () => {
        let buyerStartingBalance
        beforeEach(async () => {
            tx = await FantomHome.connect(addr1).listProperty(
                propertyId,
                propertyAddress,
                price,
                documents
            )
            tx = await FantomHome.connect(addr2).purchaseProperty(propertyId, {
                value: price,
            })
            buyerStartingBalance = await ethers.provider.getBalance(addr2)
        })

        it("Should transfer eth to buyer", async () => {
            tx = await FantomHome.connect(addr1).ReturnPayment(propertyId)

            const buyerCurrentBalance = await ethers.provider.getBalance(addr2)
            assert.equal(
                ethers.formatEther(buyerCurrentBalance),
                ethers.formatEther(buyerStartingBalance + price)
            )
        })

        it("Should only be called by seller", async () => {
            try {
                tx = await FantomHome.connect(addr2).ReturnPayment(propertyId)
            } catch (e) {
                expect(tx).to.be.revertedWith("FantomHome_OnlySeller")
            }
        })

        it("Should reduce contract balance", async () => {
            tx = await FantomHome.connect(addr1).ReturnPayment(propertyId)

            const fantomBal = await ethers.provider.getBalance(
                FantomHome.target
            )
            assert.notEqual(fantomBal, price)
        })
    })
})
