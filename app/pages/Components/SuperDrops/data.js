import { Tag } from "antd"
import CollectionsCard from "../CollectionsCard/CollectionsCard"
import LandsCard from "../LandsCard/LandsCard"
import HomesCard from "../HomeCard/HomesCard"
export const ourTabs = [
    {
        key: 1,
        Tab: <Tag className="tags">Homes</Tag>,
        children: <HomesCard />,
    },
    {
        key: 2,
        Tab: <Tag className="tags">Wearables</Tag>,
        children: <CollectionsCard />,
    },
    {
        key: 3,
        Tab: <Tag className="tags">Characters</Tag>,
        children: <LandsCard />,
    },
]

import React from "react"

const data = () => {
    return <div>data</div>
}

export default data
