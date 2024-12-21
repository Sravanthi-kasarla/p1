import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landingpage from './components/Landingpage';
import Registration from './components/Registration';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <Navbar /> 
      <div className='content'>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;