import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Services from './Services';
import HowItWorks from './HowItWorks';
import TechCertifications from './TechCertifications';
import StatsDashboard from './StatsDashboard';
import ThreatMap from './ThreatMap';
import Cases from './Cases';
import Blog from './Blog';
import FAQ from './FAQ';
import Contact from './Contact';
import Footer from './Footer';
import { LucideIcon } from './LucideIcon';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentSection, setCurrentSection] = useState('home');

  // Hook into scroll to track where the user is
  useEffect(() => {
    const sections = ['home', 'sobre', 'servicos', 'tecnologias', 'cases', 'blog', 'faq', 'contato'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset for headers

      for (const section of sections) {
        const el = document.getElementById(section === 'cases' ? 'cases-studies' : section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div id="blackshield-sec-platform" className="bg-bg-cyber min-h-screen text-slate-100 font-sans selection:bg-neon-blue selection:text-black-deep antialiased relative">
      
      {/* GLOBAL GLOW BACKDROPS & HUD DECORATIVE LINES */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[-20%] w-[60vw] h-[60vw] rounded-full bg-neon-purple/5 blur-[160px]" />
        <div className="absolute bottom-[15%] right-[-20%] w-[50vw] h-[50vw] rounded-full bg-neon-blue/5 blur-[160px]" />
        
        {/* Decorative HUD side bars from design theme */}
        <div className="hidden xl:block absolute top-24 right-8 w-[2px] h-32 bg-gradient-to-b from-neon-blue/40 to-transparent" />
        <div className="hidden xl:block absolute bottom-24 left-8 w-[2px] h-32 bg-gradient-to-t from-neon-purple/40 to-transparent" />
      </div>

      {/* FIXED PREMIUM NAVBAR */}
      <div className="relative z-50">
        <Navbar currentSection={currentSection} />
      </div>

      {/* CORE PORTFOLIO SECTIONS WRAPPERS */}
      <main id="securities-presentation" className="relative z-10">
        
        {/* Section 1: Hero first fold */}
        <section id="banner-section">
          <Hero />
        </section>

        {/* Section 2: Sobre a Empresa */}
        <section id="about-section">
          <About />
        </section>

        {/* Section 3: Serviços advanced security portfolio */}
        <section id="services-section">
          <Services />
        </section>

        {/* Section 4: Como funciona timeline */}
        <section id="howitworks-section">
          <HowItWorks />
        </section>

        {/* Section 5: Tecnologias e conformidades */}
        <section id="certifications-section">
          <TechCertifications />
        </section>

        {/* Section 6: Estatísticas / Gráficos dashboard cockpit */}
        <section id="stats-section">
          <StatsDashboard />
        </section>

        {/* Section 6.5: Interactive Global Threat map */}
        <section id="threat-map-section">
          <ThreatMap />
        </section>

        {/* Section 7: Cases e Prova social testimonials */}
        <section id="cases-section">
          <Cases />
        </section>

        {/* Section 8: Blog de segurança */}
        <section id="blog-section">
          <Blog />
        </section>

        {/* Section 9: Accordion FAQ interativo */}
        <section id="faq-section">
          <FAQ />
        </section>

        {/* Section 10: Formulário de contato premium */}
        <section id="contact-form-section">
          <Contact />
        </section>

      </main>

      {/* FOOTER COGNITIVE AREA */}
      <div className="relative z-10">
        <Footer />
      </div>

    </div>
  );
}

