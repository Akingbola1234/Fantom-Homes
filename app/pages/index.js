import Head from "next/head"
import { useContext } from "react"
import Navbar from "./Components/NavBar/NavBar"
import HeroPage from "./Components/HeroPage/HeroPage"
import Partners from "./Components/Partners/Partners"
import SuperDrops from "./Components/SuperDrops/SuperDrops"
import LiveAuction from "./Components/LiveAuction/LiveAuction"
import Creator from "./Components/Creators/Creators"
import SellNft from "./Components/SellNft/SellNft"
import Cta from "./Components/Cta/Cta"
import Footer from "./Components/Footer/Footer"

export default function Home() {
    return (
        <div className=" flex flex-col relative scrollbar-hide overflow-hidden">
            <Head>
                <title>Fantom World</title>
                <link rel="icon" href="/ct.png" />
            </Head>

            <main>
                <Navbar />
                <HeroPage />
                <Partners />
                <SuperDrops />
                <LiveAuction />
                <SellNft />
                <Creator />
                <Cta />
                <Footer />
            </main>
            {/* {showModal && <HandleModal />} */}
        </div>
    )
}
