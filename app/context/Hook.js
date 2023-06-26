import React, { createContext, useState } from "react"

export const HookContext = createContext()
const HookProvider = ({ children }) => {
    const [clickedNft, setClickedNft] = useState([0])
    return (
        <HookContext.Provider
            value={{
                clickedNft,
                setClickedNft,
            }}
        >
            {children}
        </HookContext.Provider>
    )
}

export default HookProvider
