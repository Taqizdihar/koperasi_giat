
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './views/Home';
import About from './views/About';
import Membership from './views/Membership';
import Contact from './views/Contact';
import Services from './views/Services';
import Information from './views/Information';
import InformationDetail from './views/InformationDetail';
import { SettingsProvider } from './components/SettingsContext';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <SettingsProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tentang" element={<About />} />
              <Route path="/tentang-kami" element={<About />} />
              <Route path="/layanan" element={<Services />} />
              <Route path="/layanan-produk" element={<Services />} />
              <Route path="/informasi" element={<Information />} />
              <Route path="/informasi/:id" element={<InformationDetail />} />
              <Route path="/keanggotaan" element={<Membership />} />
              <Route path="/kontak" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </SettingsProvider>
  );
};

export default App;
