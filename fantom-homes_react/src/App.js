import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Creators from "./Components/Creators/Creators"
import Cta from "./Components/Cta/Cta"
import Footer from "./Components/Footer/Footer"
import HeroPage from "./Components/HeroPage/HeroPage"
import LiveAuction from "./Components/LiveAuction/LiveAuction"
import NavBar from "./Components/NavBar/NavBar"
import Partners from "./Components/Partners/Partners"
import SellNft from "./Components/SellNft/SellNft"
import SuperDrops from "./Components/SuperDrops/SuperDrops"
import "@rainbow-me/rainbowkit/styles.css"

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { configureChains, createConfig, WagmiConfig } from "wagmi"
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { publicProvider } from "wagmi/providers/public"

const { chains, publicClient } = configureChains(
    [mainnet, polygon, optimism, arbitrum],
    [alchemyProvider({ apiKey: process.env.apiKey }), publicProvider()]
)

const { connectors } = getDefaultWallets({
    appName: "BitHomes",
    projectId: "ProjectID",
    chains,
})

const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
})
function App() {
    return (
        <>
            <WagmiConfig config={wagmiConfig}>
                <RainbowKitProvider chains={chains}>
                    <Router>
                        <NavBar />
                        <Routes>
                            <Route
                                exact
                                path="/"
                                element={
                                    <>
                                        <HeroPage />
                                        <Partners />
                                        <SuperDrops />
                                        <LiveAuction />
                                        <SellNft />
                                        <Creators />
                                        <Cta />
                                        <Footer />
                                    </>
                                }
                            />
                            <Route
                                exact
                                path="marketplace"
                                element={<SuperDrops />}
                            />
                        </Routes>
                    </Router>
                </RainbowKitProvider>
            </WagmiConfig>
        </>
    )
}

export default App
