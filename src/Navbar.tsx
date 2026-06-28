import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LucideIcon } from './LucideIcon';

interface NavbarProps {
  currentSection: string;
}

export default function Navbar({ currentSection }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Tecnologias', href: '#tecnologias' },
    { label: 'Cases', href: '#cases' },
    { label: 'Blog', href: '#blog' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contato', href: '#contato' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // height of the navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-nav"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#050816]/90 backdrop-blur-md border-b border-neon-purple/20 shadow-[0_4px_30px_rgba(123,46,255,0.08)] py-4' 
          : 'bg-transparent border-b border-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#home" 
            onClick={(e) => handleLinkClick(e, '#home')}
            className="flex items-center space-x-3 group"
          >
            <div className="relative flex items-center justify-center h-8 transition-transform duration-300 group-hover:scale-105">
              <img 
                src="/logo.png" 
                alt="Logo" 
                className="h-8 w-auto object-contain"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <div>
              <span className="font-display font-bold text-xl tracking-tighter uppercase text-white">
                BLACK<span className="text-[#00D1FF]">SHIELD</span>
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => {
              const isActive = currentSection === link.href.slice(1);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`px-1 py-1 font-display text-xs font-semibold tracking-widest uppercase transition-all duration-300 ${
                    isActive
                      ? 'text-neon-blue border-b border-neon-blue'
                      : 'text-gray-400 hover:text-neon-blue'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* CTA & Status Indicator */}
          <div className="hidden lg:flex items-center space-x-6">
            <a
              href="#contato"
              onClick={(e) => handleLinkClick(e, '#contato')}
              className="px-6 py-2 border border-neon-blue text-neon-blue text-xs font-bold tracking-widest uppercase hover:bg-neon-blue/10 transition-all duration-300 rounded-sm"
            >
              SOLICITAR AUDITORIA
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              id="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded border border-gray-700 hover:border-neon-blue select-none focus:outline-none"
              aria-label="Toggle Menu"
            >
              <LucideIcon name={mobileMenuOpen ? 'x' : 'menu'} className="w-5 h-5 text-gray-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer list */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-bg-cyber/95 backdrop-blur-lg border-b border-neon-blue/20"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => {
                const isActive = currentSection === link.href.slice(1);
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`block px-4 py-3 font-display text-base font-medium tracking-wide rounded transition-all ${
                      isActive
                        ? 'text-neon-blue bg-neon-blue/10 border-l-4 border-neon-blue'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
              <div className="pt-4 border-t border-gray-800 flex flex-col space-y-4">
                <div className="flex items-center space-x-2 px-4 py-2 font-mono text-xs text-neon-blue/80">
                  <span className="block h-2 w-2 rounded-full bg-neon-blue" />
                  <span>IP PROXIED: 200.19.45.101</span>
                </div>
                <a
                  href="#contato"
                  onClick={(e) => handleLinkClick(e, '#contato')}
                  className="flex items-center justify-center space-x-2 px-4 py-4.5 bg-gradient-to-r from-neon-blue to-neon-purple text-black-deep text-sm font-bold tracking-widest uppercase rounded neon-glow-blue"
                >
                  <span>SOLICITAR CONSULTORIA SECURE</span>
                  <LucideIcon name="arrowRight" className="w-4 h-4 text-black-deep" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
