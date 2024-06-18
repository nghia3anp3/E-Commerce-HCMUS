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
import SearchPage from './pages/SearchPage';
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

const PublicRoutes = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';
  const isForgetPasswordPage = location.pathname === '/forgetPassword';
  const isChangePasswordPage = location.pathname === '/changePassword';
  if (isLoginPage) {
    return <Login />;
  } else if (isRegisterPage) {
    return <Register />;
  } else if (isForgetPasswordPage) {
    return <ForgetPassword />
  } else if (isChangePasswordPage) {
    return <ChangePassword />
  }
  // Conditionally render the header and footer
  const renderHeaderFooter = !(isLoginPage || isRegisterPage || isForgetPasswordPage || isChangePasswordPage);

  return (
    <>
      {renderHeaderFooter && <Header />}
      <div className={renderHeaderFooter ? 'mt-20' : ''}> {/* Add top margin to create space for the header */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:page' element={<Home />} />
          <Route path='/search' element={<SearchPage/>} />
          <Route path='/account' element={<Account />} />
          <Route path='/product/:product_id' element={<ProductDetails />} />
          <Route path='/:p_type/:type/:page' element={<ProductType />} />
          <Route path='/checkout' element={<CheckOut />} />
        </Routes>
      </div>
      {renderHeaderFooter && <Sidebar />}
      {renderHeaderFooter && <Footer />}
    </>
  );
};

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
