import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
//import pages
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails'
//import components
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
const App = () => {
  return <div className='overflow-hidden'>
    <Router>
      <Header />
      <div className="mt-20"> {/* Add top margin to create space for the header */}
        <Routes>
          <Route path='/' element={<Home /> } />
          <Route path='/product/:id' element={<ProductDetails />} />
        </Routes>
      </div>
      <Sidebar />
      <Footer />
    </Router>
  </div>
}

export default App;