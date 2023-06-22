import { useState } from "react"
import "./Components/NavBar/NavBar.css"
import "./Components/HeroPage/HeroPage.css"
import "./Components/Partners/Partners.css"
import "./Components/NftCard/NftCard.css"
// import "./Components/HomesCard/HomesCard.css"
import "./Components/SuperDrops/SuperDrops.css"
import "./Components/LiveAuction/LiveAuction.css"
import "./Components/Creators/Creators.css"
import "./Components/SellNft/SellNft.css"
import "./Components/Cta/Cta.css"
import "./Components/Footer/Footer.css"

import "./App.css"

function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />
}

export default MyApp
