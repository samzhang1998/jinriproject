import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import AboutUs from './Pages/AboutUs';
import Footer from './Footer';
import ContactUs from './Pages/ContactUs';
import ForIndividual from './Pages/ForIndividual';
import ForPartner from './Pages/ForPartner';
import Login from './Pages/Login';
import Searchresult1 from './Pages/Searchresult1';
import Searchresult2 from './Pages/Searchresult2';
import PurchasePage from './Purchase/Purchasereport';
import 'typeface-montserrat';
import AgentPortal from './Agent Portal/AgentPortal';
import OrderDetail from './Agent Portal/OrderDetail';
import ScrollToTop from './ScrollTop';
import SignUp from './Pages/SignUp';
import ThankYou from './Purchase/ThankYou';
import CheckAddress from './Pages/CheckAddress';
import Admin from './Agent Portal/Admin';
import Adminlogin from './Pages/Adminlogin';
import Completion from './Purchase/Completion';

function App () {
  // localStorage.clear();
  return(
    <Router>
      <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/individual" element={<ForIndividual />} />
          <Route path="/partner" element={<ForPartner />} />
          <Route path="/login" element={<Login />} />
          <Route path="/address" element={<CheckAddress />} />
          <Route path="/report" element={<Searchresult1 />} />
          <Route path="/report/:id" element={<Searchresult1 />} />
          <Route path="/bookinspector" element={<Searchresult2 />} />                                
          <Route path="/purchasereport" element={<PurchasePage />} />
          <Route path="/thankyou" element={<ThankYou />} />
          <Route path="/:type/:id" element={<AgentPortal />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/:type/:id/orders/:orderId/:orderStatus" element={<OrderDetail />} />
          <Route path="/adminlogin" element={<Adminlogin />} />
          <Route path="/admin/:id" element={<Admin />} />
          <Route path="/complete" element={<Completion />} />                    
        </Routes>
        <Footer />
    </Router>
  );    
};

export default App;