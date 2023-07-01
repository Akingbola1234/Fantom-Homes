import React, { useContext } from "react"
import NavBar from "../Components/NavBar/NavBar"
import NftDetailsPage from "../Components/NftDetailsPage/NftDetailsPage"
import { HookContext } from "../../context/Hook"

const NftDetails = () => {
    return (
        <div>
            <NavBar />
            <NftDetailsPage />
        </div>
    )
}

export default NftDetails
