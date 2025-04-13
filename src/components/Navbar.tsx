
import React, { useState, useEffect } from 'react';
import { MenuIcon, XIcon, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
            <span className="text-white font-bold text-xl">R</span>
          </div>
          <span className="font-display font-bold text-xl bg-clip-text text-transparent bg-gradient-primary">
            Revento
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/events" className="font-medium hover:text-primary transition-colors">Events</Link>
          <Link to="/rewards" className="font-medium hover:text-primary transition-colors">Rewards</Link>
          <Link to="/tickets" className="font-medium hover:text-primary transition-colors">My Tickets</Link>
          <Link to="/map" className="font-medium hover:text-primary transition-colors">Map</Link>
          <Link to="/support" className="font-medium hover:text-primary transition-colors">Support</Link>
          <Link to="/auth" className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg px-4 py-2 transition-all duration-300">
            <User size={18} />
            <span>Login</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isOpen ? (
            <XIcon className="h-6 w-6 text-gray-800" />
          ) : (
            <MenuIcon className="h-6 w-6 text-gray-800" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden bg-white w-full shadow-lg transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-96 py-4' : 'max-h-0 overflow-hidden'
      }`}>
        <div className="container mx-auto px-4 flex flex-col gap-4">
          <Link to="/events" className="font-medium py-2 hover:text-primary transition-colors">Events</Link>
          <Link to="/rewards" className="font-medium py-2 hover:text-primary transition-colors">Rewards</Link>
          <Link to="/tickets" className="font-medium py-2 hover:text-primary transition-colors">My Tickets</Link>
          <Link to="/map" className="font-medium py-2 hover:text-primary transition-colors">Map</Link>
          <Link to="/support" className="font-medium py-2 hover:text-primary transition-colors">Support</Link>
          <Link to="/auth" className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg px-4 py-2 transition-all duration-300">
            <User size={18} />
            <span>Login</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
