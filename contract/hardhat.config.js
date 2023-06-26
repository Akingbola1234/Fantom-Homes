require("@nomicfoundation/hardhat-toolbox")

require("dotenv").config()

/** @type import('hardhat/config').HardhatUserConfig */

const S_RPC_URL = process.env.S_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const F_RPC_URL = process.env.F_RPC_URL
const F_API_KEY = process.env.F_API_KEY
module.exports = {
    solidity: "0.8.18",

    networks: {
        sepolia: {
            url: S_RPC_URL,
            accounts: [PRIVATE_KEY],
            gas: 21000000,
            gasPrice: 8000000000,
        },
        fantomTestnet: {
            url: F_RPC_URL,
            accounts: [PRIVATE_KEY],
            gas: 21000000,
            gasPrice: 8000000000,
        },
    },
    etherscan: {
        apiKey: {
            ftmTestnet: `${F_API_KEY}`,
            sepolia: `${process.env.S_API_KEY}`,
        },
    },
}
