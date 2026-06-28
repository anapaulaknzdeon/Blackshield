import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LucideIcon } from './LucideIcon';
import { Testimonial } from './types';

export default function Cases() {
  const [activeCaseIdx, setActiveCaseIdx] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 'case-01',
      name: 'Renata Oliveira',
      role: 'Chief Information Security Officer (CISO)',
      company: 'NexaPay Global Financial',
      quote: 'A BlackShield mitigou um ataque de DDoS massivo de 2.4 Tbps direcionado ao nosso gateway de transferência Pix em menos de 10 segundos. O sistema continuou operando normalmente sem que os clientes soubessem de nada. Absolutamente impecável.',
      rating: 5,
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=faces',
      result: 'DDoS de 2.4 Tbps Mitigado & 100% Uptime'
    },
    {
      id: 'case-02',
      name: 'Felipe Gonçalves',
      role: 'VP of Technology & Cloud Infrastructure',
      company: 'OmniVarejo S.A.',
      quote: 'Durante nossa auditoria preventiva, identificamos um backdoor de nível de firmware dormente em um fornecedor em nuvem. A equipe SOC da BlackShield isolou a ameaça em tempo recorde e evitou o vazamento de 4 milhões de dados sensíveis de cartões de clientes.',
      rating: 5,
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces',
      result: 'Isolamento em <15 Segundos & 4M Registros Salvos'
    },
    {
      id: 'case-03',
      name: 'Patrícia Moraes',
      role: 'Diretor de Operações de Infraestrutura',
      company: 'BioTech Labs International',
      quote: 'Estávamos sofrendo tentativas furtivas de roubo de propriedade intelectual por exfiltração lateral. A arquitetura Zero Trust implementada pela BlackShield interceptou o vetor e bloqueou instantaneamente as credenciais compromised em tempo real.',
      rating: 5,
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=faces',
      result: 'Zero Vazamentos & Proteção de IP Blindada'
    }
  ];

  return (
    <section id="cases-studies" className="relative py-24 bg-bg-cyber/95 overflow-hidden border-t border-gray-900">
      <div className="absolute inset-0 cyber-grid-dense opacity-15" />
      <div className="absolute top-[30%] left-[-10%] w-[400px] h-[400px] bg-neon-purple/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="font-mono text-xs uppercase text-neon-purple tracking-widest font-bold">
            06 // PROVA SOCIAL E ESTUDOS DE CASO DE SUCESSO
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-3 tracking-tight">
            Cases & <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-blue">Feedbacks</span> Premium
          </h2>
          <p className="text-gray-400 mt-4 text-sm sm:text-base">
            Descubra como blindamos impérios empresariais e desarmamos ameaças governamentais evasivas com máxima integridade de negócios.
          </p>
        </div>

        {/* STUDY CASES INTERACTIVE SWIPER GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Left selectors list panel */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-display text-2xl font-black text-white mb-6 uppercase tracking-tight text-center sm:text-left">
              Linhas de Defesa Ativas
            </h3>
            {testimonials.map((test, index) => {
              const isActive = index === activeCaseIdx;
              return (
                <button
                  key={test.id}
                  onClick={() => setActiveCaseIdx(index)}
                  className={`w-full text-left p-5 rounded-xl border transition-all duration-300 flex items-center justify-between select-none group cursor-pointer ${
                    isActive 
                      ? 'glass-panel border-neon-blue bg-neon-blue/5 shadow-[0_4px_20px_rgba(0,209,255,0.1)]' 
                      : 'border-transparent hover:bg-white/5 bg-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={test.avatarUrl}
                      alt={test.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full border border-gray-700 object-cover"
                    />
                    <div>
                      <h4 className={`font-display text-sm font-bold ${isActive ? 'text-neon-blue' : 'text-gray-300'}`}>
                        {test.name}
                      </h4>
                      <p className="font-mono text-[9px] text-gray-400">
                        {test.role} • <span className="text-neon-blue/80">{test.company}</span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <span className={`font-mono text-[10px] boder px-2.5 py-1 rounded-md font-semibold ${
                      isActive ? 'text-neon-blue border-neon-blue/30 bg-neon-blue/10' : 'text-gray-500 border-gray-800/80 hover:text-gray-300'
                    }`}>
                      {isActive ? 'Visualizando' : 'Ver Depoimento'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Detailed Testimonial Display Area */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCaseIdx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="glass-panel p-8 sm:p-10 rounded-2xl relative border border-neon-blue/30 shadow-[0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden"
              >
                {/* Glowing neon accent background dots */}
                <div className="absolute top-[-20%] right-[-20%] w-[150px] h-[150px] bg-neon-blue/10 rounded-full blur-[40px]" />
                <div className="absolute bottom-[-20%] left-[-20%] w-[150px] h-[150px] bg-neon-purple/10 rounded-full blur-[40px]" />

                {/* Score rating and code metrics */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-900 pb-5 mb-6 gap-3">
                  <div className="flex items-center space-x-1 text-neon-blue">
                    {Array.from({ length: testimonials[activeCaseIdx].rating }).map((_, i) => (
                      <span key={i} className="text-xs">★</span>
                    ))}
                    <span className="font-sans text-[10px] text-gray-400 ml-2 font-semibold">Avaliação Recorrente [5/5]</span>
                  </div>
                  <div className="font-sans text-[10px] bg-neon-blue/10 border border-neon-blue/25 text-neon-blue px-3.5 py-1 rounded-full text-center font-bold tracking-wide">
                    Estudo de Caso #0{activeCaseIdx + 1}
                  </div>
                </div>

                {/* Main Quote text */}
                <p className="font-serif italic text-lg text-slate-200 leading-relaxed min-h-[140px]">
                  “{testimonials[activeCaseIdx].quote}”
                </p>

                {/* Outcome result showcase details */}
                <div className="mt-8 pt-5 border-t border-gray-900 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <span className="block font-mono text-[8.5px] text-gray-500 uppercase tracking-widest mb-1">
                      RESULTADOS DIRETOS ALCANÇADOS
                    </span>
                    <span className="inline-flex items-center space-x-2 text-neon-green font-display font-semibold text-sm sm:text-base leading-none">
                      <LucideIcon name="checkCircle" className="w-4.5 h-4.5" color="green" />
                      <span>{testimonials[activeCaseIdx].result}</span>
                    </span>
                  </div>
                  
                  {/* Avatar credentials details in the footer of testimonial */}
                  <div className="flex items-center space-x-3 text-left">
                    <img
                      src={testimonials[activeCaseIdx].avatarUrl}
                      alt={testimonials[activeCaseIdx].name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full border-2 border-neon-blue object-cover shadow"
                    />
                    <div>
                      <span className="block font-display text-xs font-bold text-white tracking-wide">
                        {testimonials[activeCaseIdx].name}
                      </span>
                      <span className="block font-mono text-[8.5px] text-gray-500">
                        {testimonials[activeCaseIdx].role} at {testimonials[activeCaseIdx].company}
                      </span>
                    </div>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
