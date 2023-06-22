import { useState } from "react"
import "./Components/NavBar/NavBar.css"
import "./Components/HeroPage/HeroPage.css"
import "./App.css"

function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />
}

export default MyApp
