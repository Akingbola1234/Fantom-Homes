import { React} from "react";
import { Tabs } from "antd";
import "./CreatorPage.css";
import Overview from "../Overview/Overview";
import LandsCard from "../LandsCard/LandsCard"
import HomesCard from "../HomesCard/HomesCard"
import CreatorHomes from "../CreatorHomes/CreatorHomes";

const {TabPane} = Tabs;
const CreatorPage = () => {  
  return (
    <div className="creator-container">
      <div className="creator-nav-menu">
        <Tabs defaultActiveKey="overview" className="creators-tabs">
            <TabPane tab="Overview" key="overview">
                <Overview/>
            </TabPane>
            <TabPane tab="Homes" key="homes">
                <CreatorHomes/>
            </TabPane>
            <TabPane tab="Collection" key="collection">
                <HomesCard/>
            </TabPane>
            <TabPane tab="Lands" key="Land">
                <LandsCard/>
            </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default CreatorPage;
