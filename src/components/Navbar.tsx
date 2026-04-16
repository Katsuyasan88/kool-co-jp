import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

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
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-effect py-3 shadow-md' : 'py-6'}`}>
      <div className="container flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold flex items-center gap-3">
          <img src="/logo.png" alt="SmartThanks Logo" className="w-10 h-10 object-contain" />
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
      {isOpen && (
        <div className="md:hidden glass-effect absolute top-full left-0 w-full p-6 flex flex-col gap-4 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-lg font-medium p-2 ${location.pathname === link.path ? 'text-primary border-l-4 border-primary pl-4' : 'text-text-main'}`}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/contact" className="btn btn-primary text-center mt-4">
            お問い合わせ
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
