import { React, useState } from "react";
import { Tabs } from "antd";
import "./CreatorPage.css";

const {TabPane} = Tabs;
const CreatorPage = () => {  
  return (
    <div className="creator-container">
      <div className="creator-nav-menu">
        <Tabs defaultActiveKey="overview">
            <TabPane tab="Overview" key="overview">
                Overview
            </TabPane>
            <TabPane tab="Homes" key="homes">
                Homes
            </TabPane>
            <TabPane tab="Collection" key="collection">
                Collection
            </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default CreatorPage;
