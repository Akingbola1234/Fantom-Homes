const hre = require("hardhat")
const grandManor = require("../metadata/fantomHome-grand-manor.json")

async function verify(contractName, contractAddress, args) {
    console.log("Verifying Contract....")
    try {
        await run("verify:verify", {
            contract: `contracts/FantomMarketplace/${contractName}.sol:${contractName}`,
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified")
        } else {
            console.log(e)
        }
    }
}

async function depolyFantomHome() {
    const FantomHomes = await hre.ethers.deployContract("FantomHomes")

    await FantomHomes.waitForDeployment(5)

    console.log(`FantomHome deployed to ${FantomHomes.target}`)
    console.log("Waiting for block txs")
    await FantomHomes.deploymentTransaction(5)

    const artist = "0xb1f540756be3c06ebbcac15d701c5477f271a7a0"
    const royaltyFee = 500
    const uri = [
        "https://bafkreighgt2nt44eytynx5lizpfhsexzi2c4bhw4xpakxbuuea4enp4whq.ipfs.nftstorage.link/",
        "https://bafkreicnbcf66aho3jv7pnjyz6akutragzl6rj26byyinccgftvtfmnj3y.ipfs.nftstorage.link/",
        "https://bafkreiey2vixarvvmbsjs36sgbodwobdqkev6s5wswxil5nwcrx6yv7pue.ipfs.nftstorage.link/",
        "https://bafkreif6uv2jzwuow4dyljlgvjqrttehsg6jblt4szels3tkvn5fxfkvg4.ipfs.nftstorage.link/",
        "https://bafkreifxuvoim6w7u6u5z2mheizonv4a7jaflf7tkx5jypa4besrqyx3yi.ipfs.nftstorage.link/",
    ]
    let tx
    for (let i = 0; i < uri.length; i++) {
        tx = await FantomHomes.mint(artist, royaltyFee, uri[i])
        await tx.wait(2)
    }
    return [FantomHomes.target]
}
async function main() {
    const FantomHomeAddress = await depolyFantomHome()
    await verify("FantomHomes", FantomHomeAddress.toString(), [])

    const MarketPlace = await hre.ethers.deployContract("Marketplace")

    await MarketPlace.waitForDeployment(10)

    console.log(`Marketplace deployed at ${MarketPlace.target}`)
    console.log("Waiting for block txs")
    await MarketPlace.deploymentTransaction(10)
    await verify("Marketplace", MarketPlace.target, [])
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
