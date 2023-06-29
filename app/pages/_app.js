import { useState } from "react"
import "./Components/NavBar/NavBar.css"
import "./Components/HeroPage/HeroPage.css"
import "./Components/Partners/Partners.css"
import "./Components/HomeCard/HomesCard.module.css"
import "./Components/SuperDrops/SuperDrops.css"
import "./Components/LiveAuction/LiveAuction.css"
import "./Components/Creators/Creators.css"
import "./Components/SellNft/SellNft.css"
import "./Components/Cta/Cta.css"
import "./Components/Footer/Footer.css"
// import "./Components/CreatorPage/CreatorPage.css"
import "./Components/CreatorPage/CreatorPage.css"
import "./Components/CreatorCollection/CreatorCollection.css"
import "./Components/CreatorHomes/CreatorHomes.css"
import "./page/CreateNFT.css"
import "./App.css"
import "../styles/globals.css"

import "@rainbow-me/rainbowkit/styles.css"
import {
    getDefaultWallets,
    RainbowKitProvider,
    connectorsForWallets,
    darkTheme,
    midnightTheme,
} from "@rainbow-me/rainbowkit"
import { configureChains, createConfig, sepolia, WagmiConfig } from "wagmi"
import { goerli, optimismGoerli, fantomTestnet } from "wagmi/chains"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { publicProvider } from "wagmi/providers/public"
import HookProvider from "../context/Hook"

const { chains, publicClient, webSocketPublicClient } = configureChains(
    [sepolia],
    [
        alchemyProvider({ apiKey: "PrdHvDC9SU7_y9GyCH3tG734SOMbwAkj" }),
        publicProvider(),
    ]
)
const { connectors } = getDefaultWallets({
    appName: "VoteChain",
    projectId: "1694a591eac2ab285be5adbbfff34913",
    chains,
})
// const connectors = connectorsForWallets([
//     {
//         groupName: "Other",
//         wallets: [
//             argentWallet({ chains }),
//             trustWallet({ chains }),
//             omniWallet({ chains }),
//             imTokenWallet({ chains }),
//             ledgerWallet({ chains }),
//         ],
//     },
// ])
const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient,
})

function MyApp({ Component, pageProps }) {
    return (
        <HookProvider>
            <WagmiConfig config={wagmiConfig}>
                <RainbowKitProvider
                    theme={darkTheme()}
                    modalSize="compact"
                    chains={chains}
                >
                    <Component {...pageProps} />{" "}
                </RainbowKitProvider>{" "}
            </WagmiConfig>
        </HookProvider>
    )
}

export default MyApp
