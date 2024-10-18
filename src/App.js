import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import AboutUs from './Pages/AboutUs';
import Footer from './Footer';
import ContactUs from './Pages/ContactUs';
import ForBuyers from './Pages/ForBuyers';
import ForSellers from './Pages/ForSellers';
import ForInspectors from './Pages/ForInspectors';
import ForSalesAgents from './Pages/ForSalesAgents';
import Login from './Pages/Login';
import Searchresult1 from './Pages/Searchresult1';
import Searchresult2 from './Pages/Searchresult2';
import PurchasePage from './Purchase/Purchasereport';
import 'typeface-montserrat';
import AgentPortal from './Agent Portal/AgentPortal';
import OrderDetail from './Agent Portal/OrderDetail';

function App () {
  return(
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/buyers" element={<ForBuyers />} />
          <Route path="/sellers" element={<ForSellers />} />
          <Route path="/inspectors" element={<ForInspectors />} />
          <Route path="/agents" element={<ForSalesAgents />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search1" element={<Searchresult1 />} />
          <Route path="/search2" element={<Searchresult2 />} />                                
          <Route path="/purchasereport" element={<PurchasePage />} />
          <Route path="/agentportal" element={<AgentPortal />} />
          <Route path="/orders/:orderId" element={<OrderDetail />} />                      
        </Routes>
        <Footer />
      </div>      
    </Router>
  );    
};

export default App;

