import React, {useContext} from 'react'
import {BrowserRouter as Router, Route, Routes, Outlet, useLocation, Navigate} from 'react-router-dom';
//import pages
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails'
import ProductType from './pages/ProductType';
import Login from './pages/login';
import Register from './pages/register';
import Account from './pages/account';
import ForgetPassword from './pages/ForgetPassword';
import ChangePassword from './pages/ChangePassword';
import CheckOut from './pages/Checkout';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminProducts from './pages/Admin/AdminProducts';
import AdminOrders from './pages/Admin/AdminOrders';
import AdminUsers from './pages/Admin/AdminUsers';
import { AuthContext } from './context/AuthContext';
//import components
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Footer from './components/Footer'

const App = () => {
  const { user, isLoggedIn } = useContext(AuthContext);
  return (
    <Router>
      <div className='overflow-hidden'>
        <Routes>
          {/* Public Routes */}
          <Route path='/*' element={<PublicRoutes />} />
          {/* Admin Routes */}
          <Route path='/admin/*' element={<AdminRoutes />} />
        </Routes>
      </div>
    </Router>
  );
}

const PublicRoutes = () => (
  <>
  <Header />
  <div className="mt-20"> {/* Add top margin to create space for the header */}
    <Routes>
      <Route path='/' element={<Home /> } />
      <Route path='/account' element={<Account /> } />
      <Route path='/product/:product_id' element={<ProductDetails />} />
      <Route path='/:p_type/:type/:page' element={<ProductType />} />
      <Route path='/login' element= {<Login />} />
      <Route path = '/register' element = {<Register/>} />
      <Route path = '/forgetPassword' element = {<ForgetPassword/>} />
      <Route path = '/changePassword' element = {<ChangePassword/>} />
      <Route path = '/checkout' element = {<CheckOut/>} />
    </Routes>
  </div>
  <Sidebar />
  <Footer />
  </>
);

const AdminRoutes = () => {
  return (
    <div className='flex'>
      <Sidebar />
      <Routes>
        <Route path='/' element={<AdminDashboard />} />
        <Route path='/products' element={<AdminProducts />} />
        <Route path='/orders' element={<AdminOrders />} />
        <Route path='/users' element={<AdminUsers />} />
      </Routes>
    </div>
  );
};


export default App;
