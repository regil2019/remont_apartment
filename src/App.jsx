import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Reviews from './components/Reviews';
import Breadcrumb from './components/Breadcrumb';

const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Calculator = lazy(() => import('./components/Calculator'));
const Contacts = lazy(() => import('./pages/Contacts'));

function App() {
  return (
    <Router>
      <Header />

      <main className="main-content">
        <Breadcrumb />

        <Suspense fallback={
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Загрузка...</p>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/services" element={<Services />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/contacts" element={<Contacts />} />
          </Routes>
        </Suspense>
      </main>
    </Router>
  );
}

export default App;
