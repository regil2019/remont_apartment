import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Reviews from './components/Reviews';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import Calculator from './components/Calculator';
import Contacts from './pages/Contacts';
function App() {
  return (
    <Router>
      <Header/>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/reviews" element={<Reviews/>} />
        <Route path="/services" element={<Services/>} />
        <Route path="/gallery" element={<Gallery/>} />
        <Route path="/calculator" element={<Calculator/>}/>
        <Route path="/contacts" element={<Contacts/>}/>
        
      </Routes>
    </Router>
  );
}
export default App;
