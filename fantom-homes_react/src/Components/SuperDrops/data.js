import { Tag } from "antd"
import "./SuperDrops.css"
import NftCard from "../NftCard/NftCard"
import HomesCard from "../HomesCard/HomesCard"
import LandsCard from "../LandsCard/LandsCard"

export const ourTabs = [{
        key: 1,
        Tab: <Tag className="tags">Homes</Tag>,
        children:  <NftCard />
    },
    {
        key: 2,
        Tab: <Tag className="tags">Collections</Tag>,
        children: <HomesCard/>
    },
    {
        key: 3,
        Tab: <Tag className="tags">Lands</Tag>,
        children: <LandsCard/>
    },
]