import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import ScrollToTop from './components/ScrollToTop.tsx';
import Loading from './components/Loading.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import LegacyTermsRedirect from './components/LegacyTermsRedirect.tsx';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home.tsx'));
const Company = lazy(() => import('./pages/Company.tsx'));
const News = lazy(() => import('./pages/News.tsx'));
const Service = lazy(() => import('./pages/Service.tsx'));
const Contact = lazy(() => import('./pages/Contact.tsx'));
const Privacy = lazy(() => import('./pages/Privacy.tsx'));
const Legal = lazy(() => import('./pages/Legal.tsx'));
const Gachacho = lazy(() => import('./pages/Gachacho.tsx'));
const GachachoTerms = lazy(() => import('./pages/GachachoTerms.tsx'));
const NotFound = lazy(() => import('./pages/NotFound.tsx'));

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app-shell">
        <Navbar />
        <main>
          <ErrorBoundary>
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/company" element={<Company />} />
                <Route path="/news" element={<News />} />
                <Route path="/service" element={<Service />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/legal" element={<Legal />} />
                <Route path="/gachacho" element={<Gachacho />} />
                <Route path="/gachacho/terms" element={<GachachoTerms />} />
                {/* 旧iOS版(1.0.1/build 9)が参照する旧URL。本文は置かず正規URLへ転送する */}
                <Route path="/terms" element={<LegacyTermsRedirect />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
