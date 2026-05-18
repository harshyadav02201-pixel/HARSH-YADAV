import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Menu, X, Phone, UserCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/#services' },
    { name: 'Quote', href: '/#quote' },
    { name: 'Insights', href: '/#blog' },
    { name: 'Contact', href: '/#contact' },
  ];

  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 border-b border-transparent",
        scrolled || isDashboard ? "bg-dark-card border-slate-800 shadow-xl" : "bg-transparent text-white"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/"
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-blue-600 shadow-lg shadow-blue-600/20 rounded-md flex items-center justify-center font-bold text-white">
            HY
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight leading-tight text-white">
              Harsh Yadav
            </h1>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-blue-400">
              ICICI Prudential Advisory
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className={cn(
                "text-sm font-medium hover:text-blue-400 transition-colors",
                scrolled || isDashboard ? "text-slate-300" : "text-white"
              )}
            >
              {link.name}
            </a>
          ))}
          
          <Link 
            to="/dashboard"
            className="flex items-center gap-2 text-slate-300 hover:text-blue-400 transition-colors text-sm font-medium"
          >
            <UserCircle size={20} />
            Portal
          </Link>

          <a 
            href="https://wa.me/+910000000000" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600/10 text-green-400 px-4 py-1.5 rounded-full border border-green-600/30 flex items-center gap-2 text-sm font-bold transition-all hover:bg-green-600/20"
          >
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            WhatsApp
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <motion.div
        initial={false}
        animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        className="md:hidden overflow-hidden bg-dark-card text-white absolute top-full left-0 right-0 shadow-2xl border-b border-slate-800"
      >
        <div className="flex flex-col p-6 gap-4">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium border-b border-slate-800 pb-2"
            >
              {link.name}
            </a>
          ))}
          <Link 
            to="/dashboard"
            onClick={() => setIsOpen(false)}
            className="text-lg font-medium border-b border-slate-800 pb-2 flex items-center gap-2"
          >
            <UserCircle size={20} />
            Client Portal
          </Link>
        </div>
      </motion.div>
    </header>
  );
}
