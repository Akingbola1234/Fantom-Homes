require("@nomicfoundation/hardhat-toolbox")

require("dotenv").config()

/** @type import('hardhat/config').HardhatUserConfig */

const S_RPC_URL = process.env.S_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
module.exports = {
    solidity: "0.8.18",

    networks: {
        sepolia: {
            url: S_RPC_URL,
            accounts: [PRIVATE_KEY],
            gas: 21000000,
            gasPrice: 8000000000,
        },
    },
}
