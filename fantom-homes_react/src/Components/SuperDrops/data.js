import { Tag } from "antd"
import "./SuperDrops.css"
import NftCard from "../NftCard/NftCard"
import LandsCard from "../LandsCard/LandsCard"
import CollectionsCard from "../CollectionsCard/CollectionsCard"

export const ourTabs = [{
        key: 1,
        Tab: <Tag className="tags">Homes</Tag>,
        children:  <NftCard />
    },
    {
        key: 2,
        Tab: <Tag className="tags">Collections</Tag>,
        children: <CollectionsCard/>
    },
    {
        key: 3,
        Tab: <Tag className="tags">Lands</Tag>,
        children: <LandsCard/>
    },
]