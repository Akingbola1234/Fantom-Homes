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

    await FantomHomes.waitForDeployment(3)

    console.log(`FantomHome deployed to ${FantomHomes.target}`)
    console.log("Waiting for block txs")
    await FantomHomes.deploymentTransaction(3)

    const artist = "0xb1f540756be3c06ebbcac15d701c5477f271a7a0"
    const royaltyFee = 500
    const uri = [
        "https://bafkreiguf2pffeazupr4pjprtbf3rnqq5ix4jwfzihemb6allqy7s3jbpi.ipfs.nftstorage.link/",
        "https://bafkreid6byqrm5226xfve7khbcfl4di4mrxrp5vbtkq3ooxb5olz3sbgi4.ipfs.nftstorage.link/",
        "https://bafkreiauqkr6443jp35lrq3wtfhulusd4ehsuthppa4tdm4szgnvjlu2iu.ipfs.nftstorage.link/",
        "https://bafkreidjzp7uowmluxndx3u4mytwwv6d45asz5kdgrkwg6soljrautex5m.ipfs.nftstorage.link/",
        "https://bafkreif3ixsxzvjsfboydrcbqh5dtrepyep7ijjfd55rvwfv3gr7de4yje.ipfs.nftstorage.link/",
        "https://bafkreid2irqrzexq2ohmqbakeow2hk2emufivf6a7uyw4xvsita34xuu7e.ipfs.nftstorage.link/",
        "https://bafkreidz4s5a6hsumd5luag5iagd4xvqy2g3sjt45brz5g4ny6jf6edt4y.ipfs.nftstorage.link/",
        "https://bafkreibs2hjoi2veposfmjnbge4jbu5bleowpx2kbarkrhwunaowuiymhu.ipfs.nftstorage.link/",
        "https://bafkreidz4s5a6hsumd5luag5iagd4xvqy2g3sjt45brz5g4ny6jf6edt4y.ipfs.nftstorage.link/",
        "https://bafkreib3eexyxpku2z2t4p4edpru4bnsp5ng3xzmgxhcxglf5fr3ouniqe.ipfs.nftstorage.link/",
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
    const _totalSupply = Number(await FantomHomes.totalSupply())
    console.log(_totalSupply)
    return { address: FantomHomes, _totalSupply }
}

async function deployFantomChar() {
    const FantomChar = await hre.ethers.deployContract("FantomCharacters")
    await FantomChar.waitForDeployment(3)

    console.log(`FantomChar deployed at ${FantomChar.target}`)
    console.log("Waiting for block txs")
    const artist = "0xb1f540756be3c06ebbcac15d701c5477f271a7a0"
    const royaltyFee = 500

    const uri = [
        "https://bafkreiczj4spp5wi37fkhz6xg6e25tovwpyekx4wjrjzobj6y6zcbp3xuu.ipfs.nftstorage.link/",
        "https://bafkreihjswn2lewq23bxxzncjw7m5hsu4ilp4eehyevxnonezckafn4qma.ipfs.nftstorage.link/",
        "https://bafkreicdvsz4zgxryaak7mzse4tg5kk6qlyipa4ywrlkz5b2cryxvnyhba.ipfs.nftstorage.link/",
        "https://bafkreiguwuk5etqpwyizdjsn4ym4vnyp5rl7kfv2yrsedm7oxweeilnq7e.ipfs.nftstorage.link/",
        "https://bafkreihd2e7mxyg6dnrorae2ihi2eumy3l7pngpbckcevlnpls6aac6xkq.ipfs.nftstorage.link/",
        "https://bafkreibkip7vcoa7yl33wk56kl5d4duj5gia7wab76fijlakqsijxsfcbu.ipfs.nftstorage.link/",
        "https://bafkreia4hxu4a3jkwt6fslxhzade2lzmmjo67up2opfkg4loaubdxqwmey.ipfs.nftstorage.link/",
        "https://bafkreifldd6yndl4mealqexogkbxkaftgrdzilabqskyropjnevx5cyufe.ipfs.nftstorage.link/",
        "https://bafkreieyjqtdqkhjjvu77jz4c7vnyaxh32epj3ocaq7uuwahkhyvqxjixm.ipfs.nftstorage.link/",
        "https://bafkreiaq2to2hxmadi7zzxvr6dui2bcm2ungoh7wvzcgojvhymrph32sfq.ipfs.nftstorage.link/",
        "https://bafkreighwsl5bual7a2w4tanzjtudg2iblpskgytkdeljk54piowzjyhmy.ipfs.nftstorage.link/",
        "https://bafkreid7ttsyxc7l6wseui7aagj63gyozyujzcqduielmdafhfd5yi3kiq.ipfs.nftstorage.link/",
    ]

    let tx
    for (let i = 0; i < uri.length; i++) {
        tx = await FantomChar.mint(artist, royaltyFee, uri[i])
        await tx.wait(2)
    }

    const _totalSupply = Number(await FantomChar.totalSupply())
    console.log(_totalSupply)
    return { address: FantomChar, _totalSupply }
}

async function deployFantomAcc() {
    const uri = [
        "https://bafkreigfhrqgo4xyi45xbji2pinm6ee5cwvgumkvkk2ugyt3odmjwjzlea.ipfs.nftstorage.link/",
        "https://bafkreiaagmfztazl7qk5roguvurcx643jywrhziehgzocjgcd63dllnuue.ipfs.nftstorage.link/",
        "https://bafkreidmgqdh22vq6ehmmtdvfx4cbyvgh5l5rdpqlv7drofhoglvab5lz4.ipfs.nftstorage.link/",
        "https://bafkreiejuditannvet3swytmlj72id3hgajagyvntatdrany3r56squdki.ipfs.nftstorage.link/",
        "https://bafkreihvimbiibhmc2veqivqzufsjjwjsbd3j72s36lp6ffcweulzcpc4a.ipfs.nftstorage.link/",
    ]

    const FantomAcc = await hre.ethers.deployContract("FantomAcc")

    await FantomAcc.waitForDeployment(3)

    console.log(`FantomAcc deployed to ${FantomAcc.target}`)
    console.log("Waiting for block txs")
    await FantomAcc.deploymentTransaction(3)

    const artist = "0xb1f540756be3c06ebbcac15d701c5477f271a7a0"
    const royaltyFee = 500
    let tx
    for (let i = 0; i < uri.length; i++) {
        tx = await FantomAcc.mint(artist, royaltyFee, uri[i])
        await tx.wait(2)
    }
    const _totalSupply = Number(await FantomAcc.totalSupply())
    console.log(_totalSupply)
    return { address: FantomAcc, _totalSupply }
}
async function main() {
    const homeInfo = await depolyFantomHome()
    console.log("Total Home minted", homeInfo._totalSupply)
    const accInfo = await deployFantomAcc()
    console.log("Total Acc minted", accInfo._totalSupply)
    const charInfo = await deployFantomChar()
    console.log("Total Char minted", charInfo._totalSupply)
    await verify("FantomHomes", homeInfo.address.target.toString(), [])
    await verify("FantomAcc", accInfo.address.target.toString(), [])
    await verify("FantomCharacters", charInfo.address.target.toString(), [])

    const MarketPlace = await hre.ethers.deployContract("Marketplace")

    await MarketPlace.waitForDeployment(5)
    const minter = "0xb1f540756be3c06ebbcac15d701c5477f271a7a0"
    console.log(`Marketplace deployed at ${MarketPlace.target}`)
    console.log("Waiting for block txs")
    await MarketPlace.deploymentTransaction(5)
    const startTimestamp = Math.floor(Date.now() / 1000) + 50000
    const endTimestamp = Math.floor(startTimestamp + 5000)
    // for (let i = 0; i < homeInfo._totalSupply; i++) {
    //     await homeInfo.address.approve(MarketPlace.target, i)
    //     const ListingParameters = {
    //         assetContract: homeInfo.address,
    //         tokenId: i,
    //         quantity: 1,
    //         pricePerToken: hre.ethers.parseEther("3"),
    //         startTimestamp: startTimestamp,
    //         endTimestamp: endTimestamp,
    //         reserved: false,
    //     }

    //     let tx = await MarketPlace.createListing(ListingParameters)

    //     await tx.wait()
    // }

    // for (let i = 0; i < charInfo._totalSupply; i++) {
    //     await charInfo.address.approve(MarketPlace.target, i)
    //     const ListingParameters = {
    //         assetContract: charInfo.address,
    //         tokenId: i,
    //         quantity: 1,
    //         pricePerToken: hre.ethers.parseEther("3"),
    //         startTimestamp: startTimestamp,
    //         endTimestamp: endTimestamp,
    //         reserved: false,
    //     }

    //     let tx = await MarketPlace.createListing(ListingParameters)

    //     await tx.wait()
    // }

    // for (let i = 0; i < accInfo._totalSupply; i++) {
    //     await accInfo.address.approve(MarketPlace.target, i)
    //     const ListingParameters = {
    //         assetContract: accInfo.address,
    //         tokenId: i,
    //         quantity: 1,
    //         pricePerToken: hre.ethers.parseEther("3"),
    //         startTimestamp: startTimestamp,
    //         endTimestamp: endTimestamp,
    //         reserved: false,
    //     }

    //     let tx = await MarketPlace.createListing(ListingParameters)

    //     await tx.wait()
    // }

    await verify("Marketplace", MarketPlace.target, [])
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
