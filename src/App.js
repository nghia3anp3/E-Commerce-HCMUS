import React from 'react';
import {BrowserRouter as Router, Route, Routes, Outlet, useLocation} from 'react-router-dom';
//import pages
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails'
import ProductType from './pages/ProductType';
import Login from './pages/login';
import Register from './pages/register';
import Account from './pages/account';
import ForgetPassword from './pages/ForgetPassword';
import ChangePassword from './pages/ChangePassword';
//import components
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Footer from './components/Footer'



const App = () => {

  // const isLoginPage = () => {
  //   return window.location.pathname === '/login' || window.location.pathname === '/register';
  // };

  return (
    <div className='overflow-hidden'>
      <Router>
        <Header />
        <div className="mt-20"> {/* Add top margin to create space for the header */}
          <Routes>
            <Route path='/' element={<Home /> } />
            <Route path='/account' element={<Account /> } />
            <Route path='/product/:id' element={<ProductDetails />} />
            <Route path='/:p_type/:type' element={<ProductType />} />
            <Route path='/login' element= {<Login />} />
            <Route path = '/register' element = {<Register/>} />
            <Route path = '/forgetPassword' element = {<ForgetPassword/>} />
            <Route path = '/change_password' element = {<ChangePassword/>} />
          </Routes>
        </div>
        <Sidebar />
        <Footer />
      </Router>
    </div>
  )
}

export default App;