import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'ホーム', path: '/' },
    { name: '事業内容', path: '/service' },
    { name: 'ニュース', path: '/news' },
    { name: '会社概要', path: '/company' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-effect py-2 md:py-3 shadow-md' : 'py-4 md:py-6'}`}>
      <div className="container flex items-center justify-between">
        <Link to="/" className="text-xl md:text-2xl font-bold flex items-center gap-2 md:gap-3">
          <img src="/logo.png" alt="SmartThanks Logo" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
          <span className="gradient-text">SmartThanks</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-medium hover:text-primary ${location.pathname === link.path ? 'text-primary' : 'text-text-main'}`}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/contact" className="btn btn-primary py-2 px-6 text-sm">
            お問い合わせ
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-text-main" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay to close menu on outside click */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/10 backdrop-blur-[2px] z-40 md:hidden"
            />
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden bg-white absolute top-full left-0 w-full overflow-hidden shadow-xl z-50"
            >
              <div className="p-6 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-lg font-bold p-3 rounded-2xl transition-all ${location.pathname === link.path ? 'bg-primary/10 text-primary pl-6' : 'text-text-main border border-transparent hover:bg-bg-soft'}`}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link to="/contact" className="btn btn-primary text-center mt-4 py-4 rounded-2xl shadow-lg">
                  お問い合わせ
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
