import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from './LucideIcon';
import { TimelineStep } from './types';

export default function HowItWorks() {
  const steps: (TimelineStep & { icon: string })[] = [
    {
      number: '01',
      title: 'Diagnóstico',
      description: 'Inventário completo de ativos digitais expostos à internet pública e mapeamento geral de risco em toda a infraestrutura física e na nuvem.',
      status: 'completed',
      icon: 'compass'
    },
    {
      number: '02',
      title: 'Identificação de Vulnerabilidades',
      description: 'Testes de intrusão ativos (Red Team) e varreduras automatizadas varrendo sistemas à procura de portas abertas, falhas de patch ou credenciais vazadas.',
      status: 'completed',
      icon: 'search'
    },
    {
      number: '03',
      title: 'Implementação',
      description: 'Implantação de agentes EDR nos endpoints, setup de perímetros SDP/Zero Trust, criptografia imutável de backups e robustecimento de clusters.',
      status: 'active',
      icon: 'lockKeyhole'
    },
    {
      number: '04',
      title: 'Monitoramento Contínuo',
      description: 'Sistemas ativos alimentando nosso cockpit central de SOC 24/7/365, com análise proativa de telemetrias e caça de ameaças com IA.',
      status: 'pending',
      icon: 'eye'
    },
    {
      number: '05',
      title: 'Relatórios e Otimização',
      description: 'Envio mensal de auditorias executivas contendo maturidade de segurança, remediações efetuadas e planos de evolução contínua.',
      status: 'pending',
      icon: 'barChart'
    }
  ];

  return (
    <section id="processo" className="relative py-24 bg-bg-cyber overflow-hidden border-t border-gray-900">
      {/* Background patterns */}
      <div className="absolute inset-0 cyber-grid-dense opacity-15" />
      <div className="absolute top-[30%] left-[-10%] w-[350px] h-[350px] bg-neon-blue/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[350px] h-[350px] bg-neon-purple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="font-mono text-xs uppercase text-neon-blue tracking-widest font-bold">
            03 // PROTOCOLOS E PROCESSOS DE SEGURANÇA
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-3 tracking-tight">
            Como Funciona a <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">Blindagem</span>
          </h2>
          <p className="text-gray-400 mt-4 text-sm sm:text-base">
            Mapeamos, isolamos, protegemos e monitoramos seus ativos de ponta a ponta com máxima rastreabilidade do tráfego corporativo.
          </p>
        </div>

        {/* TIMELINE VIEW (Horizontal in Desktop, Vertical in Mobile) */}
        <div className="relative mt-16 pb-12">
          
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-neon-blue via-neon-purple to-gray-800 -translate-y-1/2 z-0" />
          
          {/* Connecting Line Glow Effect */}
          <div className="hidden lg:block absolute top-1/2 left-[10%] right-[30%] h-0.5 bg-gradient-to-r from-neon-blue via-neon-purple to-transparent blur-sm -translate-y-1/2 z-0 opacity-40" />

          {/* Timeline Nodes Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-6 relative z-10">
            {steps.map((step, idx) => {
              const isCompleted = step.status === 'completed';
              const isActive = step.status === 'active';

              const glowClass = isCompleted 
                ? 'neon-border-glow-green border-neon-green/40' 
                : isActive 
                  ? 'neon-border-glow-blue border-neon-blue/80' 
                  : 'border-gray-800';

              const numberColorClass = isCompleted 
                ? 'text-neon-green' 
                : isActive 
                  ? 'text-neon-blue' 
                  : 'text-gray-600';

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.12 }}
                  className="flex flex-col items-center text-center lg:items-start lg:text-left relative group pl-0 lg:pl-4"
                >
                  {/* Decorative connector line (Mobile Only) */}
                  {idx < steps.length - 1 && (
                    <div className="lg:hidden absolute bottom-[-45px] left-1/2 -translate-x-1/2 w-0.5 h-10 bg-gradient-to-b from-neon-blue to-gray-800" />
                  )}

                  {/* Circular Node Icon */}
                  <div className={`relative w-14 h-14 rounded-full bg-black-deep flex items-center justify-center border-2 transition-all duration-300 ${glowClass} mb-6`}>
                    
                    {/* Ring ping indicators for active processing */}
                    {isActive && (
                      <span className="absolute inset-0 rounded-full bg-neon-blue/25 animate-ping" />
                    )}

                    <LucideIcon 
                      name={step.icon} 
                      className="w-5.5 h-5.5" 
                      color={isCompleted ? 'green' : isActive ? 'blue' : 'gray'} 
                    />

                    {/* Badge Number indicator */}
                    <span className="absolute -bottom-2 -right-2 px-1.5 py-0.5 bg-bg-cyber border border-gray-800 rounded text-[9px] font-mono text-gray-400 font-bold group-hover:border-neon-purple/40">
                      #{step.number}
                    </span>
                  </div>

                  {/* Content Container */}
                  <div className="glass-panel p-6 rounded-xl border border-gray-800/80 hover:border-neon-purple/35 transition-all duration-300 w-full flex-1">
                    <span className={`block font-mono text-[9px] font-bold uppercase tracking-wider mb-2 ${numberColorClass}`}>
                      {isCompleted ? 'STAGE_COMPLETED' : isActive ? 'STAGE_ACTIVE' : 'STAGE_PENDING'}
                    </span>
                    <h3 className="font-display text-lg font-bold text-white mb-2 tracking-wide group-hover:text-neon-blue transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 font-sans text-xs leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* Extra info metrics HUD brief */}
        <div className="mt-16 bg-black-deep/40 p-5 rounded-xl border border-gray-900 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
          <div className="flex items-center space-x-3 text-left">
            <div className="p-2 bg-neon-green/10 rounded-lg text-neon-green border border-neon-green/20">
              <LucideIcon name="shieldCheck" className="w-5.5 h-5.5" color="green" />
            </div>
            <div>
              <span className="block font-sans text-xs text-white font-bold leading-none">Aumente sua Maturidade em Seguranca</span>
              <span className="font-mono text-[9.5px] text-gray-500 block mt-1.5">Conformidade total ao padrão governamental brasileiro (LGPD + ANPD)</span>
            </div>
          </div>
          <a
            href="#contato"
            className="w-full sm:w-auto text-center px-5 py-2.5 bg-neon-purple text-white hover:bg-neon-blue hover:text-black-deep text-xs font-bold tracking-widest uppercase rounded transition-all select-none"
          >
            Iniciar Diagnóstico Grátis
          </a>
        </div>

      </div>
    </section>
  );
}
