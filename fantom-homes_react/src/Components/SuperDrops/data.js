import { Tag } from "antd"
import "./SuperDrops.css"
import NftCard from "../NftCard/NftCard"
import HomesCard from "../HomesCard/HomesCard"
import LandsCard from "../LandsCard/LandsCard"

export const ourTabs = [{
        key: 1,
<<<<<<< HEAD
        Tab: <Tag className="tags">Hope Ape</Tag>,
=======
        Tab: <Tag className="tags">Homes</Tag>,
>>>>>>> 25e99bfdea4658629ce97e7cf69368fe7aeaa58d
        children:  <NftCard />
    },
    {
        key: 2,
<<<<<<< HEAD
        Tab: <Tag className="tags">Homes</Tag>,
=======
        Tab: <Tag className="tags">Collections</Tag>,
>>>>>>> 25e99bfdea4658629ce97e7cf69368fe7aeaa58d
        children: <HomesCard/>
    },
    {
        key: 3,
<<<<<<< HEAD
        Tab: <Tag className="tags">Monkey</Tag>,
        children: <NftCard/>
    },
    {
        key: 4,
        Tab: <Tag className="tags">Cars</Tag>,
        children: <NftCard/>
    },
    {
        key: 5,
        Tab: <Tag className="tags">Art</Tag>,
        children: <NftCard/>
    }

=======
        Tab: <Tag className="tags">Lands</Tag>,
        children: <LandsCard/>
    },
>>>>>>> 25e99bfdea4658629ce97e7cf69368fe7aeaa58d
]