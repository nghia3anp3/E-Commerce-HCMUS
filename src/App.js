import React from 'react';
import {BrowserRouter as Router, Route, Routes, Outlet, useLocation} from 'react-router-dom';
//import pages
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails'
import ProductType from './pages/ProductType';
import Login from './pages/login';
import Register from './pages/register';
//import components
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Hero from './components/Hero';
import LoginHeader from './components/LoginHeader';
import Footer from './components/Footer'
import Navbar from './components/Navbar'

import Menu from './components/menu/menu';

const App = () => {

  // const isLoginPage = () => {
  //   return window.location.pathname === '/login' || window.location.pathname === '/register';
  // };

  return (
    <div className='overflow-hidden'>
      <Router>
        <div>
          <Header />
          <Menu />
        </div>
        <div className="mt-20"> {/* Add top margin to create space for the header */}
          <Routes>
            <Route path='/' element={<Home /> } />
            <Route path='/product/:id' element={<ProductDetails />} />
            <Route path='/:p_type/:type' element={<ProductType />} />
            <Route path='/login' element= {<Login />} />
            <Route path = '/register' element = {<Register/>} />
          </Routes>
        </div>
        <Sidebar />
        <Footer />
      </Router>
    </div>
  )
}

export default App;