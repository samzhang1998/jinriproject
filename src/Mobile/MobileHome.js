import React from "react";
import Header from "../Header";
import "./MobileHome.css";
import Search from "../Pages/search";
import OurCustomers from "../Pages/OurCustomers";
import Findreport from "../Pages/Findreport";
import Introduction from "../Pages/Introduction";
import Strength from "../Pages/Strength";

const MobileHome = () => {
    return (
        <div className="mobile">
            <div className="mobile_box1">
                <Header />
                <h1>The home of property <br /> compliance and due diligence</h1>
                <p>Independent, Professional Reports</p>
                <Search />
            </div>
            <div className="mobile_box2">
                <Introduction />
                <Strength />
                <div className="mobile_box4">
                    <OurCustomers />
                </div>
                <Findreport />
            </div>
        </div>
    );
};

export default MobileHome;