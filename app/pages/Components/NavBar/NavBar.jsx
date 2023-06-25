import React, { useState } from "react"
import { Drawer } from "antd"
import Link from "next/link"
// import { useNavigate } from "react-router-dom"
import { ConnectButton } from "@rainbow-me/rainbowkit"

import { FaBars } from "react-icons/fa"

const NavBar = () => {
    // const navigate = useNavigate()
    const handleNavigate = () => {
        // navigate("/")
    }
    const [open, setOpen] = useState(false)
    const showMenu = () => {
        setOpen(true)
    }
    const hideMenu = () => {
        setOpen(false)
    }
    return (
        <div className="navbar-container">
            <div className="logo">
                <Link
                    href={"/"}
                    style={{
                        outline: "none",
                        textDecoration: "none",
                    }}
                >
                    <h5>FantomWorld</h5>
                </Link>
            </div>
            <div className="nav-list">
                <ul>
                    <li>
                        <Link
                            className="navigation-link"
                            href={"/page/Marketplace"}
                            // style={({ isActive }) => ({
                            //     color: isActive ? "#0038ed" : "#FFF",
                            // })}
                        >
                            Marketplace
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="navigation-link"
                            href="/page/Creator"
                            // style={({ isActive }) => ({
                            //     color: isActive ? "#0038ed" : "#FFF",
                            // })}
                        >
                            Creator
                        </Link>
                    </li>
                </ul>
            </div>
            <ConnectButton />

            <div className="nav-button">
                {/* <button>Connect Wallet</button>
                 */}
                {/* <ConnectBtn />
                 */}
                {/* <ConnectButton className="connect-btn">Connect Wallet</ConnectButton> */}
            </div>
            <button onClick={showMenu} className="nav-bar-icon">
                <FaBars />
            </button>
            <Drawer
                placement="left"
                onClose={hideMenu}
                open={open}
                className="mobile-menu"
            >
                <ul>
                    <li>Drop</li>
                    <li>Marketplace</li>
                    <li>Creator</li>
                    <li>Community</li>
                    <button>Connect Wallet</button>
                </ul>
            </Drawer>
        </div>
    )
}

export default NavBar
