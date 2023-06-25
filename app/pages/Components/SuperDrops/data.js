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
        Tab: <Tag className="tags">Collections</Tag>,
        children: <CollectionsCard />,
    },
    {
        key: 3,
        Tab: <Tag className="tags">Lands</Tag>,
        children: <LandsCard />,
    },
]
