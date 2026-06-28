import React from 'react';
import { LucideIcon } from './LucideIcon';

export default function Footer() {
  const rapidLinks = {
    modulos: [
      { label: 'Penetration Testing', href: '#servicos' },
      { label: 'Monitoramento 24/7', href: '#servicos' },
      { label: 'Defesa contra Ransomware', href: '#servicos' },
      { label: 'Cloud Security', href: '#servicos' },
    ],
    empresa: [
      { label: 'Sobre Nós', href: '#sobre' },
      { label: 'Cases & Prova Social', href: '#cases-studies' },
      { label: 'Tecnologias', href: '#tecnologias' },
      { label: 'Ameaças de Blog', href: '#blog' },
    ],
    legal: [
      { label: 'Políticas de Privacidade', href: '#' },
      { label: 'Termos de Uso de Perímetro', href: '#' },
      { label: 'Código de Conduta Ética', href: '#' },
      { label: 'Relatórios', href: '#' },
    ]
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Scroll smoothly to anchor sections
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <footer className="relative bg-[#02040a] border-t border-gray-900 pt-16 pb-8 overflow-hidden">
      {/* Glow discreto background decorative line bottom */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-neon-blue/30 to-transparent" />
      <div className="absolute bottom-0 left-[25%] right-[25%] h-[200px] w-[50%] bg-neon-purple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12">
          
          {/* Logo Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative flex items-center justify-center h-8">
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
                <span className="font-display font-black text-lg tracking-wider text-white">
                  BLACK<span className="text-neon-blue">SHIELD</span>
                </span>
              </div>
            </div>

            <p className="text-gray-450 font-sans text-xs leading-relaxed max-w-sm">
              Líder global e referência incontestável em cybersecurity  sob demanda, garantindo imunidade técnica total para as maiores marcas do cenário corporativo nacional e internacional.
            </p>

            {/* Social icon tags row */}
            <div className="flex items-center space-x-3.5 pt-2">
              <a
                href="#"
                className="w-8 h-8 rounded bg-black-deep border border-gray-850 hover:border-neon-blue text-gray-400 hover:text-white flex items-center justify-center transition-colors shadow"
                aria-label="Secure GitHub Link"
              >
                <LucideIcon name="terminal" className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded bg-black-deep border border-gray-850 hover:border-neon-purple text-gray-400 hover:text-white flex items-center justify-center transition-colors shadow"
                aria-label="LinkedIN Portal"
              >
                <LucideIcon name="shield" className="w-4 h-4 text-neon-purple" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded bg-black-deep border border-gray-850 hover:border-neon-green text-gray-400 hover:text-white flex items-center justify-center transition-colors shadow"
                aria-label="Active Global Web"
              >
                <LucideIcon name="globe" className="w-4 h-4 text-neon-green" />
              </a>
            </div>
          </div>

          {/* Rapid Links Cols */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            
            {/* Column 1: Módulos */}
            <div>
              <h4 className="font-mono text-[9px] text-gray-500 uppercase tracking-widest font-black mb-4">
                MÓDULOS DE DEFESA //
              </h4>
              <ul className="space-y-2.5">
                {rapidLinks.modulos.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="font-sans text-xs text-gray-400 hover:text-neon-blue transition-colors block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Empresa */}
            <div>
              <h4 className="font-mono text-[9px] text-gray-500 uppercase tracking-widest font-black mb-4">
                A CORPORAÇÃO //
              </h4>
              <ul className="space-y-2.5">
                {rapidLinks.empresa.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="font-sans text-xs text-gray-400 hover:text-neon-purple transition-colors block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Legal */}
            <div className="col-span-2 sm:col-span-1">
              <h4 className="font-mono text-[9px] text-gray-500 uppercase tracking-widest font-black mb-4">
                CONFORMIDADE E LEGAL //
              </h4>
              <ul className="space-y-2.5">
                {rapidLinks.legal.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-sans text-xs text-gray-400 hover:text-neon-green transition-colors block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

        {/* Real legal attributes */}
        <div className="pt-8 mt-8 border-t border-gray-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="font-sans text-[11px] text-gray-500">
              © 2026 BlackShield Security. Todos os direitos reservados.
            </p>
            <span className="block font-mono text-[8px] text-gray-600 mt-1 uppercase">
              BLACKSHIELD SECURITY LTDA. // CNPJ: 00.000.000/0001-00 // PORTFÓLIO DE CYBERSECURITY DE ALTO IMPACTO
            </span>
          </div>

          <div className="font-mono text-[8.5px] text-slate-500 opacity-60">
            SECURE HOST // CLIENT INTEGRITY CHECK PASSED
          </div>
        </div>

      </div>
    </footer>
  );
}
