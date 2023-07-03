import Head from "next/head";
import { useContext } from "react";
import Navbar from "./Components/NavBar/NavBar";
import HeroPage from "./Components/HeroPage/HeroPage";
import Partners from "./Components/Partners/Partners";
import SuperDrops from "./Components/SuperDrops/SuperDrops";
import LiveAuction from "./Components/LiveAuction/LiveAuction";
import Creator from "./Components/Creators/Creators";
import SellNft from "./Components/SellNft/SellNft";
import Cta from "./Components/Cta/Cta";
import Footer from "./Components/Footer/Footer";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <div className=" flex flex-col relative scrollbar-hide overflow-hidden">
      <Head>
        <title> Fantom World </title>{" "}
        <link rel="icon" href="/Assets/images/fantom-logo.webp" />
      </Head>
      <main>
        {" "}
        {loading ? (
          <video loop muted autoPlay playsInline id="preloader" src="./Assets/cityrenderv1.mp4">
            
          </video>
        ) : (
          <>
            {" "}
            <Navbar />
            <HeroPage />
            <Partners />
            <SuperDrops />
            <LiveAuction />
            <SellNft />
            <Creator />
            <Cta />
            <Footer />
          </>
        )}{" "}
      </main>{" "}
      {/* {showModal && <HandleModal />} */}{" "}
    </div>
  );
}
