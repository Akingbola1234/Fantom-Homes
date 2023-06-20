const {
    time,
    loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers")
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs")
const { expect, assert } = require("chai")
const { log } = require("console")
const { ethers } = require("hardhat")

describe("FantomHome", () => {
    let owner, addr1, addr2, FantomHome, tx
    const propertyId = 1
    const price = ethers.parseEther("1")
    const propertyAddress = "Shomolu"
    const documents = "docs"

    const properties = 10
    beforeEach(async () => {
        ;[owner, addr1, addr2] = await ethers.getSigners()
        FantomHome = await hre.ethers.deployContract("FantomHome")

        await FantomHome.waitForDeployment()

        for (let i = 1; i <= properties; i++) {
            tx = await FantomHome.connect(addr1).listProperty(
                propertyAddress,
                price,
                documents
            )
        }
    })

    describe("Listing", () => {
        beforeEach(async () => {})
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
            for (let i = 1; i <= properties; i++) {
                assert.equal(`${await FantomHome.states(i)}`, "0")
            }
        })
    })

    describe("Purchasing", () => {
        beforeEach(async () => {})

        it("Should purchase property", async () => {
            for (let i = 1; i < properties; i++) {
                tx = await FantomHome.connect(addr2).purchaseProperty(i, {
                    value: price,
                })
                expect(tx)
                    .to.emit(FantomHome, "PropertyPurchased")
                    .withArgs(i, price, addr2.address)

                assert.equal(`${await FantomHome.states(i)}`, "1")
            }
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
            for (let i = 1; i <= properties; i++) {
                tx = await FantomHome.connect(addr2).purchaseProperty(i, {
                    value: price,
                })
            }
        })

        it("Should confirm delivery if satisfied", async () => {
            for (let i = 1; i < properties; i++) {
                tx = await FantomHome.connect(addr2).confirm_delivery(i)

                assert.equal(`${await FantomHome.states(i)}`, "2")
            }
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
            for (let i = 1; i < properties; i++) {
                tx = await FantomHome.connect(addr2).confirm_delivery(i)

                assert.equal(`${await FantomHome.states(i)}`, "2")
            }
            for (let i = 1; i < properties; i++) {
                try {
                    txx = await FantomHome.connect(addr2).confirm_delivery(i)
                } catch (er) {
                    expect(txx).to.be.revertedWith("FantomHome_NotAllowed")
                }
            }
        })

        it("Should increase contract balance", async () => {
            const fantomBal = await ethers.provider.getBalance(
                FantomHome.target
            )
            assert.equal(
                ethers.formatEther(fantomBal),
                ethers.formatEther(price) * properties
            )
        })

        it("Should increase buyer balance", async () => {
            const agentStartingBalance = await ethers.provider.getBalance(addr1)

            for (let i = 1; i <= properties; i++) {
                tx = await FantomHome.connect(addr2).confirm_delivery(i)
            }

            const agentEndingBalance = await ethers.provider.getBalance(addr1)
            const expectedBalance =
                Number(ethers.formatEther(agentStartingBalance)) +
                Number(ethers.formatEther(price)) * properties
            assert.equal(
                Number(ethers.formatEther(agentEndingBalance)),
                expectedBalance
            )
        })
    })

    describe("Return Payment", () => {
        let buyerStartingBalance
        beforeEach(async () => {
            for (let i = 1; i <= properties; i++) {
                tx = await FantomHome.connect(addr2).purchaseProperty(i, {
                    value: price,
                })
            }
            buyerStartingBalance = await ethers.provider.getBalance(addr2)
        })

        it("Should transfer eth to buyer", async () => {
            const not_verify = 5

            for (let i = 1; i <= not_verify; i++) {
                tx = await FantomHome.connect(addr1).ReturnPayment(i)
            }

            const buyerCurrentBalance = await ethers.provider.getBalance(addr2)
            assert.equal(
                Number(ethers.formatEther(buyerCurrentBalance)),
                Number(ethers.formatEther(buyerStartingBalance)) +
                    Number(ethers.formatEther(price) * not_verify)
            )
            const fantomBal = await ethers.provider.getBalance(
                FantomHome.target
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
            const not_verify = 5

            for (let i = 1; i <= not_verify; i++) {
                tx = await FantomHome.connect(addr1).ReturnPayment(i)
            }

            const buyerCurrentBalance = await ethers.provider.getBalance(addr2)

            const fantomBal = await ethers.provider.getBalance(
                FantomHome.target
            )
            assert.equal(Number(fantomBal), Number(price) * not_verify)
        })
    })
})
