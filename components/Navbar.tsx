import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Philosophy', href: '/#intro' },
  { label: 'Works', href: '/#portfolio' },
  { label: 'Newsletter', href: '/newsletter' },
  { label: 'Corporate Education', href: '/education' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle anchor scrolling for items on the same page
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    if (href.startsWith('/#') && location.pathname === '/') {
      e.preventDefault();
      const id = href.replace('/#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setIsMobileMenuOpen(false);
    } else if (href.startsWith('/#') && location.pathname !== '/') {
      // Allow default Link behavior to go to Home then hash will be handled by Browser
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'glass-nav py-4' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-[90rem] mx-auto px-6 flex justify-between items-center">
          <Link 
            to="/" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 z-50 group"
          >
            <img src="/JOSHUA.png" alt="JOSHUA" className="h-4 brightness-0 group-hover:opacity-70 transition-opacity" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            <div className="flex gap-8">
              {navItems.map((item) => (
                <Link 
                  key={item.label} 
                  to={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-[13px] font-bold uppercase tracking-widest text-zinc-500 hover:text-black transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <motion.a 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#contact" 
              className="px-6 py-3 rounded-full bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors"
            >
              Contact
            </motion.a>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 text-zinc-900 z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X strokeWidth={2} /> : <Menu strokeWidth={2} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-white flex flex-col pt-32 px-6 md:hidden"
          >
            <div className="flex flex-col gap-8">
              {navItems.map((item, idx) => (
                <Link
                  key={item.label} 
                  to={item.href} 
                  className="text-4xl font-extrabold text-zinc-900 tracking-tight"
                  onClick={(e) => {
                    handleNavClick(e, item.href);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    {item.label}
                  </motion.span>
                </Link>
              ))}
              <motion.a 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                href="#contact" 
                className="mt-8 w-full text-center px-6 py-5 rounded-xl bg-black text-white text-lg font-bold" 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Start Project
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
