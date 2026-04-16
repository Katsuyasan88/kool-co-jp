import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import ScrollToTop from './components/ScrollToTop.tsx';
import Loading from './components/Loading.tsx';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home.tsx'));
const Company = lazy(() => import('./pages/Company.tsx'));
const News = lazy(() => import('./pages/News.tsx'));
const Service = lazy(() => import('./pages/Service.tsx'));
const Contact = lazy(() => import('./pages/Contact.tsx'));
const Privacy = lazy(() => import('./pages/Privacy.tsx'));
const Legal = lazy(() => import('./pages/Legal.tsx'));

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app-shell">
        <Navbar />
        <main>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/company" element={<Company />} />
              <Route path="/news" element={<News />} />
              <Route path="/service" element={<Service />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/legal" element={<Legal />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
