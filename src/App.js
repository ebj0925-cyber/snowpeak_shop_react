import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Home from './Home';
import Detail01 from './pages/Detail01';
import Cart from './pages/Cart';
import ComingSoon from './pages/ComingSoon';
import CategoryPage from './pages/CategoryPage';

function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:group" element={<CategoryPage />} />
        <Route path="/detail/:id" element={<Detail01 />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<ComingSoon title={'로그인'} />} />
        <Route path="/join" element={<ComingSoon title={'회원가입'} />} />
        <Route path="/support" element={<ComingSoon title={'고객센터'} />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
