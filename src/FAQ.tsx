import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LucideIcon } from './LucideIcon';
import { FAQItem } from './types';

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const faqItems: FAQItem[] = [
    {
      id: 'faq-1',
      question: 'Como funciona o Pentest (Penetration Testing)?',
      answer: 'O Pentest é uma simulação de invasão ética. Nossos engenheiros de segurança (Red Team) atacam a infraestrutura eletrônica da sua empresa de maneira controlada, usando as mesmas táticas e exploits de hackers criminosos reais. Ao final, entregamos um relatório detalhando todas as falhas exploradas, os riscos e as correções específicas de código necessárias.'
    },
    {
      id: 'faq-2',
      question: 'Minha empresa realmente precisa de serviços de Cybersecurity?',
      answer: 'Sim. Em nosso relatório anual de ameaças, constatamos que mais de 85% dos ataques cibernéticos em 2025 visaram médias e pequenas organizações por possuírem brechas óbvias. Um único incidente por infecção de ransomware pode paralisar as operações por semanas, causar vazamentos irreparáveis de segredos industriais e atrair pesadas multas da ANPD.'
    },
    {
      id: 'faq-3',
      question: 'Vocês atendem pequenas e médias empresas?',
      answer: 'Com certeza. Ajustamos nossos módulos de segurança para corresponder à escala operacional e ao orçamento de pequenas corporações de alto crescimento. Projetamos pacotes customizados de Cloud Security e análise preventiva que garantem excelente imunidade cibernética sem exigir data centers físicos complexos ou grandes equipes nativas.'
    },
    {
      id: 'faq-4',
      question: 'O monitoramento é realmente 24h por dia?',
      answer: 'Sim, ininterruptamente. Contamos com equipes de engenheiros táticos divididos em escalas de SOC (Security Operations Center) integradas em três fusos horários globais. Suas interfaces de rede e servidores em nuvem são monitorados por sistemas automatizados que disparam respostas estruturadas instantâneas a qualquer hora da noite de forma contínua.'
    },
    {
      id: 'faq-5',
      question: 'Como funciona o SOC (Security Operations Center)?',
      answer: 'O SOC reúne ferramentas digitais de big data (SIEM), inteligência cognitiva adaptável e engenheiros humanos de segurança cibernética em uma central blindada. O SOC ingere logs contínuos, analisa potenciais eventos anômalos em tempo de resposta militar, cria alertas em caso de anomalias e executa playbooks automatizados de isolamento de ameaças.'
    },
    {
      id: 'faq-6',
      question: 'Vocês ajudam no processo de adequação da LGPD?',
      answer: 'Sim. Estruturamos a adequação da Lei Geral de Proteção de Dados (LGPD) sob a perspectiva técnica. Implementamos criptografias avançadas de PII, criamos trilhas de auditorias de acessos inalteráveis, definimos logs criptografados e ajudamos sua diretoria a implantar planos de contingência de dados para plena conformidade civil.'
    }
  ];

  const handleToggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="relative py-24 bg-bg-cyber/95 overflow-hidden border-t border-gray-900">
      <div className="absolute inset-0 cyber-grid-dense opacity-15" />
      <div className="absolute bottom-[20%] right-[-10%] w-[400px] h-[400px] bg-neon-blue/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase text-neon-purple tracking-widest font-bold">
            08 // CENTRAL DE DÚVIDAS DO PROTOCOLO
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-3 tracking-tight">
            Perguntas <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-blue">Frequentes</span> (FAQ)
          </h2>
          <p className="text-gray-400 mt-4 text-sm sm:text-base">
            Esclareça dúvidas operacionais rápidas sobre auditorias, infraestrutura do SOC, conformidade de leis de dados e as metodologias aplicadas pela BlackShield.
          </p>
        </div>

        {/* Dynamic Accordion items stack */}
        <div className="space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`glass-panel rounded-xl overflow-hidden border transition-all duration-300 group ${
                  isOpen 
                    ? 'border-neon-blue/40 shadow-[0_4px_20px_rgba(0,209,255,0.08)] bg-black-deep/40' 
                    : 'border-gray-850 hover:border-neon-purple/35'
                }`}
              >
                {/* Accordion trigger button */}
                <button
                  onClick={() => handleToggle(item.id)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between select-none focus:outline-none focus:ring-1 focus:ring-neon-blue/30 rounded-xl"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-sm sm:text-base font-bold text-white group-hover:text-neon-blue transition-colors">
                    <span className="font-mono text-xs text-slate-500 mr-3 font-semibold">0{index + 1} //</span>
                    {item.question}
                  </span>
                  
                  {/* Rotating Chevron icon */}
                  <div className={`w-6 h-6 rounded bg-black-deep flex items-center justify-center border border-gray-800 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 border-neon-blue/40 text-neon-blue' : 'text-gray-400'
                  }`}>
                    <LucideIcon name="chevronDown" className="w-4 h-4" />
                  </div>
                </button>

                {/* Animated expandable panel content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-6 text-gray-300 font-sans text-xs sm:text-sm leading-relaxed border-t border-gray-900 pt-4 bg-black-deep/20">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Urgent Direct support callout footer help */}
        <div className="mt-12 text-center">
          <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block">
            NÃO ENCONTROU O QUE PROCURAVA?
          </span>
          <p className="text-sm text-gray-400 mt-2 font-sans font-medium">
            Nossa equipe de especialistas está ativa 24 horas. {' '}
            <a href="#contato" className="text-neon-blue underline font-bold hover:text-neon-purple transition-colors">
              Abra um canal direto de atendimento
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}
