import Head from "next/head"
import { useContext } from "react"
import Navbar from "./Components/NavBar/NavBar"
import HeroPage from "./Components/HeroPage/HeroPage"
export default function Home() {
    return (
        <div className=" flex flex-col relative scrollbar-hide overflow-hidden">
            <Head>
                <title>CollectTix</title>
                <link rel="icon" href="/ct.png" />
            </Head>

            <main>
                <Navbar />
                <HeroPage />
            </main>
            {/* {showModal && <HandleModal />} */}
        </div>
    )
}
