import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from './LucideIcon';

export default function About() {
  const stats = [
    { value: '+350', label: 'Clientes Coorporativos Protegidos', description: 'Instituições governamentais, bancos e agências globais de tecnologia de ponta.', icon: 'users', color: 'blue' },
    { value: '12+', label: 'Anos de Liderança e Experiência', description: 'Defendendo ecossistemas digitais contra atacantes estatais e ransomwares.', icon: 'calendar', color: 'purple' },
    { value: '+12,000', label: 'Sistemas Monitorados Ativos', description: 'Nós de servidores, infraestrutura em nuvem híbrida e endpoints em tempo real.', icon: 'server', color: 'green' },
    { value: '45+', label: 'Tecnologias Avançadas Integradas', description: 'Modelos de machine learning adaptáveis, IA generativa de threat intel e firewalls heurísticos.', icon: 'zap', color: 'blue' },
  ];

  const coreValues = [
    {
      title: 'Missão',
      desc: 'Blindar corporações contra ameaças cibernéticas sofisticadas através de resposta autônoma em tempo real, mitigando vulnerabilidades antes que se transformem em incidentes catastróficos.',
      icon: 'shield',
      color: 'blue'
    },
    {
      title: 'Visão',
      desc: 'Ser o ecossistema de segurança cibernética global mais resiliente e confiável do mundo, redefinindo defesas digitais por meio da simbiose entre inteligência computacional avançada e ética.',
      icon: 'eye',
      color: 'purple'
    },
    {
      title: 'Valores',
      desc: 'Compromisso absoluto com a confidencialidade, excelência técnica incansável, inovação disruptiva constante, proatividade cirúrgica e transparência total de incidentes.',
      icon: 'lock',
      color: 'green'
    }
  ];

  const differentials = [
    {
      title: 'Arquitetura Zero Trust Autoprogressiva',
      desc: 'Nunca confie, sempre verifique. Criamos anéis de resiliência automáticos que impedem a movimentação lateral de atacantes e criptografam o tráfego ponto a ponto de forma dinâmica.'
    },
    {
      title: 'Detecção de Ameaças Baseada em Algoritmo Heurístico',
      desc: 'Nossa IA analisa mais de 4 terabytes de logs operacionais por segundo para identificar padrões suspeitos de adversários altamente camuflados antes das assinaturas oficiais.'
    },
    {
      title: 'Equipe de Resposta de Incidentes de Elite (CSIRT)',
      desc: 'Especialistas militares altamente condecorados e pesquisadores independentes de vulnerabilidades prontos para entrar em ação em qualquer lugar do mundo em minutos.'
    }
  ];

  return (
    <section id="sobre" className="relative py-24 bg-bg-cyber overflow-hidden border-t border-gray-900">
      {/* Visual background details */}
      <div className="absolute inset-0 cyber-grid opacity-10" />
      <div className="absolute top-[30%] right-[-10%] w-[400px] h-[400px] bg-neon-blue/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[400px] h-[400px] bg-neon-purple/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase text-neon-blue tracking-widest font-bold">
            01 // CAPACITAÇÃO E AUTORIDADE
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-3 tracking-tight">
            Sobre a <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">BlackShield</span> Security
          </h2>
          <p className="text-gray-400 mt-4 text-base sm:text-lg">
            Combinamos inteligência artificial soberana com inteligência humana tática para projetar defesas invioláveis para as maiores líderes de mercado e infraestruturas cruciais de tecnologia.
          </p>
        </div>

        {/* Dynamic Metric Counter Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-panel p-6 rounded-xl border border-gray-800/80 relative hover:border-neon-blue/35 transition-all duration-300 group shadow-lg"
            >
              <div className="absolute top-4 right-4 text-gray-700/60 group-hover:text-neon-blue/40 transition-colors">
                <LucideIcon name={stat.icon} className="w-5 h-5" color={stat.color as 'blue' | 'purple' | 'green' | 'gray' | 'default'} />
              </div>
              <div className={`font-display text-3xl font-extrabold text-white mb-2 group-hover:drop-shadow-[0_0_8px_rgba(0,209,255,0.4)] transition-all`}>
                {stat.value}
              </div>
              <h3 className="font-display text-sm font-bold text-gray-200 tracking-wide mb-1.5 uppercase">
                {stat.label}
              </h3>
              <p className="text-gray-400 font-sans text-xs leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bento Grid: Mission, Vision, Values */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {coreValues.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className={`p-8 rounded-2xl glass-panel relative group`}
            >
              {/* Highlight corner lines */}
              <div className="absolute top-0 left-0 w-8 h-[1px] bg-neon-blue opacity-50 group-hover:w-16 transition-all" />
              <div className="absolute top-0 left-0 w-[1px] h-8 bg-neon-blue opacity-50 group-hover:h-16 transition-all" />
              <div className="absolute bottom-0 right-0 w-8 h-[1px] bg-neon-purple opacity-50 group-hover:w-16 transition-all" />
              <div className="absolute bottom-0 right-0 w-[1px] h-8 bg-neon-purple opacity-50 group-hover:h-16 transition-all" />

              <div className="flex items-center space-x-3.5 mb-5">
                <div className="w-10 h-10 rounded-lg bg-black-deep/60 flex items-center justify-center border border-gray-800 text-neon-blue group-hover:scale-105 transition-transform">
                  <LucideIcon name={item.icon} className="w-5 h-5" color={item.color as 'blue' | 'purple' | 'green' | 'gray' | 'default'} />
                </div>
                <h3 className="font-display text-xl font-bold text-white tracking-wide">
                  {item.title}
                </h3>
              </div>
              <p className="text-gray-300 font-sans text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Quote / Frase de Impacto Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative rounded-2xl p-8 sm:p-12 mb-20 overflow-hidden border border-neon-blue/15 text-center flex flex-col items-center justify-center bg-gradient-to-r from-neon-blue/5 via-neon-purple/5 to-transparent backdrop-blur-md"
        >
          <div className="absolute -right-12 -top-12 opacity-5">
            <LucideIcon name="shield" className="w-64 h-64 text-neon-blue" />
          </div>

          <blockquote className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-normal tracking-tight max-w-4xl relative z-10">
            “Transformando segurança digital em vantagem estratégica.”
          </blockquote>
          <p className="text-xs text-gray-400 mt-4 font-mono max-w-xl">
            Sua organização livre de preocupações operacionais para inovar, expandir e liderar mercados sem interrupções por crises cibernéticas.
          </p>
        </motion.div>

        {/* Differentials timeline list */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-12">
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-8 text-center sm:text-left">
              Diferenciais de Engenharia Tática
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {differentials.map((item, idx) => (
                <div key={idx} className="glass-panel p-6 rounded-xl border border-gray-800/80 hover:border-neon-purple/35 transition-all text-left">
                  <div className="font-mono text-xs text-neon-purple font-semibold uppercase tracking-wider mb-3">
                    DIFERENCIAL 0{idx + 1} //
                  </div>
                  <h4 className="font-display text-lg font-bold text-white mb-2 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-gray-400 font-sans text-xs sm:text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
