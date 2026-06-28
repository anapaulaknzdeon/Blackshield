import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from './LucideIcon';

export default function Hero() {
  const [terminalLines, setTerminalLines] = useState<string[]>([
    'Initializing secure connection to BlackShield SecOps Node...',
  ]);
  const [activeTab, setActiveTab] = useState<'terminal' | 'radar'>('terminal');
  const [radarRotation, setRadarRotation] = useState(0);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Simulation: command typing terminal logs
  useEffect(() => {
    const logs = [
      'SYS_CORE: Loaded AI threat matching engine v4.9.11',
      'SYS_SEC: Integrity test passed. System database SECURE.',
      'NET_MON: Scanning egress packets at gateway-East-01...',
      'THREAT_INTEL: Feed updated with 2,410 new signatures.',
      'SHIELD_DEFENSE: Active honeypot online at 195.12.33.24.',
      'MALWARE_SCAN: Vulnerability signature verification [OK]',
      'SEC_COMPLIANCE: Cloud assets integrity matching: 100% compliant',
      'INTELLIGENCE_ENGINE: Detecting active anomalies... None found',
      'LOG: Decrypting packet header: SHA-256 MATCH',
      'MONITORING: Latency optimized. SOC connection stable (0.12ms)',
      'ALERT_SYSTEM: Intrusion Prevention Protocol (IPP) ARMED',
    ];

    let currentLogIndex = 0;
    const interval = setInterval(() => {
      setTerminalLines((prev) => {
        const updated = [...prev, `[${new Date().toLocaleTimeString()}] ${logs[currentLogIndex]}`];
        // Keep last 10 lines
        if (updated.length > 10) updated.shift();
        return updated;
      });
      currentLogIndex = (currentLogIndex + 1) % logs.length;
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Scroll to bottom of terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalLines]);

  // Radar continuous rotation animation
  useEffect(() => {
    const interval = setInterval(() => {
      setRadarRotation((prev) => (prev + 2) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const handleScrollToSection = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
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
  };

  return (
    <section
      id="home"
      className="relative min-h-screen bg-bg-cyber flex items-center pt-24 pb-16 overflow-hidden"
    >
      {/* 1. FUTURISTIC BACKGROUND AND PARTICLES */}
      <div className="absolute inset-0 z-0">
        {/* Grids */}
        <div className="absolute inset-0 cyber-grid opacity-30" />
        <div className="absolute inset-0 cyber-grid-dense opacity-20" />
        
        {/* Energy Flow Radial Gradient */}
        <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-neon-purple/10 blur-[130px] animate-pulse-slow" />
        <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-neon-blue/10 blur-[130px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full bg-neon-green/5 blur-[90px] animate-pulse-slow" style={{ animationDelay: '4s' }} />

        {/* Binary Floating Elements / Connection lines simulation */}
        <div className="absolute inset-0 opacity-15 pointer-events-none select-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {/* Animated connection line points */}
            <circle cx="10%" cy="25%" r="1" className="fill-neon-blue animate-pulse" />
            <circle cx="20%" cy="50%" r="2" className="fill-neon-purple animate-pulse" />
            <circle cx="15%" cy="75%" r="1" className="fill-neon-blue" />
            <circle cx="85%" cy="15%" r="1.5" className="fill-neon-green animate-pulse" />
            <circle cx="90%" cy="60%" r="2" className="fill-neon-blue" />
            <circle cx="75%" cy="80%" r="1" className="fill-neon-purple animate-pulse" />
            
            {/* Soft geometric technical guidelines */}
            <path d="M0,150 L200,150 L250,200 L600,200" fill="none" stroke="rgba(0, 209, 255, 0.15)" strokeWidth="1" strokeDasharray="5,5" />
            <path d="M1200,600 L1000,600 L950,550 L800,550" fill="none" stroke="rgba(123, 46, 255, 0.15)" strokeWidth="1" strokeDasharray="5,5" />
            <path d="M200,700 L400,700 L450,750" fill="none" stroke="rgba(0, 255, 157, 0.1)" strokeWidth="1" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT SIDE: HEADLINE, DESCRIPTION & ACTIONS */}
          <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6.5xl font-black leading-[0.95] tracking-tighter uppercase text-white"
            >
              PROTEGENDO A <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D1FF] to-[#7B2EFF]">FRONTEIRA DIGITAL</span> EM TEMPO REAL.
            </motion.h1>

            {/* Subheadline (Paragraph style from theme text-lg text-slate-400 max-w-xl font-light) */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-slate-400 max-w-xl font-light leading-relaxed"
            >
              Infraestrutura de segurança de próxima geração impulsionada por inteligência artificial e sistemas de defesa autônomos contra ameaças avançadas em tempo real.
            </motion.p>

            {/* CTA Buttons from design specs */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <button
                id="cta-consultoria"
                onClick={(e) => handleScrollToSection(e, '#contato')}
                className="px-8 py-4 bg-[#00D1FF] text-[#050816] font-display font-bold text-xs tracking-widest uppercase shadow-[0_0_20px_rgba(0,209,255,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer selection:bg-transparent select-none rounded-sm"
              >
                SOLICITAR CONSULTORIA
              </button>

              <button
                id="cta-servicos"
                onClick={(e) => handleScrollToSection(e, '#servicos')}
                className="px-8 py-4 border border-white/20 font-display font-bold text-xs text-white tracking-widest uppercase hover:bg-white/5 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer selection:bg-transparent select-none rounded-sm"
              >
                VER SOLUÇÕES
              </button>
            </motion.div>

            {/* Realtime Threat ticker statistics brief */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="pt-8 border-t border-gray-900 grid grid-cols-3 gap-4"
            >
              <div>
                <span className="block font-mono text-[10px] uppercase text-gray-500 tracking-wider">Taxa de Sucesso </span>
                <span className="font-display font-medium text-lg text-neon-green">99.98% </span>
              </div>
              <div>
                <span className="block font-mono text-[10px] uppercase text-gray-500 tracking-wider">TEMPO DE RESPOSTA</span>
                <span className="font-display font-medium text-lg text-neon-blue">&lt; 150 Milissegundos</span>
              </div>
              <div>
                <span className="block font-mono text-[10px] uppercase text-gray-500 tracking-wider">PONTOS ATIVOS</span>
                <span className="font-display font-medium text-lg text-neon-purple">+4,800 </span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT SIDE: CYBER HUD INTERACTIVE INTERFACE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-5 relative w-full h-[400px] sm:h-[450px] lg:h-[500px]"
          >
            {/* Outer HUD Rings & Layout decoration */}
            <div className="absolute inset-x-0 -top-4 -bottom-4 bg-gradient-to-b from-neon-blue/10 via-transparent to-neon-purple/5 rounded-3xl -rotate-1 pointer-events-none" />
            
            {/* Glassmorphic Cyber Display Container */}
            <div className="relative w-full h-full glass-panel rounded-2xl border border-neon-blue/20 overflow-hidden flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              {/* Screen scanning laser animation effect */}
              <div className="absolute left-0 right-0 h-0.5 bg-neon-blue/55 shadow-[0_0_15px_#00D1FF] opacity-70 top-0 animate-[scan_6s_ease-in-out_infinite]" />

              {/* HUD Header Bar */}
              <div className="border-b border-gray-800/80 px-4 py-3 bg-black-deep/60 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-neon-green/80" />
                  </div>
                  <span className="font-mono text-[10px] text-gray-400 font-semibold tracking-wide ml-2">
                    NODE_CONSOLE // SEC_CORE_v4.5
                  </span>
                </div>

                {/* Tab switch button */}
                <div className="flex bg-black-deep rounded border border-gray-800 p-0.5">
                  <button
                    onClick={() => setActiveTab('terminal')}
                    className={`font-mono text-[9px] px-2.5 py-1 rounded transition-colors ${
                      activeTab === 'terminal' ? 'bg-neon-blue/15 text-neon-blue font-bold border border-neon-blue/20' : 'text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    TERMINAL
                  </button>
                  <button
                    onClick={() => setActiveTab('radar')}
                    className={`font-mono text-[9px] px-2.5 py-1 rounded transition-colors ${
                      activeTab === 'radar' ? 'bg-neon-purple/20 text-neon-purple font-bold border border-neon-purple/20' : 'text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    RADARES
                  </button>
                </div>
              </div>

              {/* Tab Content Display */}
              <div className="relative flex-1 p-4 overflow-hidden bg-black-deep/20 font-mono text-[10px] leading-relaxed flex flex-col">
                {activeTab === 'terminal' ? (
                  /* TAB TERMINAL */
                  <div
                    ref={terminalRef}
                    className="flex-1 overflow-y-auto space-y-1.5 pr-2 max-h-[300px] scrollbar-thin scrollbar-thumb-gray-800"
                  >
                    <div className="text-neon-green/85 flex items-center space-x-1.5 border-b border-gray-900 pb-1 mb-2">
                      <LucideIcon name="terminal" className="w-3.5 h-3.5" color="green" />
                      <span className="font-bold">LIVE INTELLIGENCE PEN TESTING FEED...</span>
                    </div>
                    {terminalLines.map((line, index) => (
                      <div key={index} className="text-gray-300 font-mono flex items-start space-x-1">
                        <span className="text-neon-blue select-none">{'>'}</span>
                        <span className="break-all">{line}</span>
                      </div>
                    ))}
                    {/* Simulated blink cursor */}
                    <div className="flex items-center space-x-1 text-neon-blue">
                      <span className="select-none">{'>'}</span>
                      <span className="w-1.5 h-3.5 bg-neon-blue inline-block animate-pulse" />
                    </div>
                  </div>
                ) : (
                  /* TAB RADAR SCREEN */
                  <div className="flex-1 flex flex-col items-center justify-center relative">
                    <div className="relative w-48 h-48 rounded-full border border-neon-blue/25 flex items-center justify-center">
                      {/* Grid concentric circles */}
                      <div className="absolute w-36 h-36 rounded-full border border-neon-blue/15" />
                      <div className="absolute w-24 h-24 rounded-full border border-neon-blue/10" />
                      <div className="absolute w-12 h-12 rounded-full border border-neon-blue/5" />
                      
                      {/* Compass degrees crosslines */}
                      <div className="absolute h-full w-[1px] bg-neon-blue/15" />
                      <div className="absolute w-full h-[1px] bg-neon-blue/15" />

                      {/* Radar sweep lines rotating */}
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{
                          transform: `rotate(${radarRotation}deg)`,
                          transformOrigin: '50% 50%',
                          background: 'conic-gradient(from 0deg, rgba(0, 209, 255, 0.25) 0deg, rgba(0, 209, 255, 0.0) 90deg)'
                        }}
                      />

                      {/* Simulated anomalies/threat coordinates locked */}
                      <div className="absolute top-[20%] left-[30%] w-2 h-2 rounded-full bg-red-500 animate-ping" />
                      <div className="absolute top-[20%] left-[30%] w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-white/40" />
                      <span className="absolute top-[12%] left-[34%] text-[8px] text-red-500 font-bold tracking-tighter">ANOMALY_01_REJECTED</span>

                      <div className="absolute bottom-[28%] right-[25%] w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                      <span className="absolute bottom-[20%] right-[10%] text-[8px] text-neon-green">GATEWAY_SAFE</span>

                      <div className="absolute top-[65%] left-[20%] w-1.5 h-1.5 rounded-full bg-neon-blue animate-pulse" />
                      <span className="absolute top-[68%] left-[22%] text-[8px] text-neon-blue">NODE_ACTIVE</span>
                    </div>
                    <div className="mt-4 text-center bg-black-deep/75 px-3 py-1.5 rounded border border-neon-purple/30 font-mono text-[9px] text-neon-purple tracking-widest leading-normal">
                      THREAT_RADAR: 360° COVERAGE ACTIVE
                    </div>
                  </div>
                )}
              </div>

              {/* HUD Footer Status panel */}
              <div className="bg-black-deep/90 border-t border-gray-800/80 px-4 py-3.5 flex items-center justify-between font-mono text-[9px]">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <span className="text-gray-500">PACKET RATE:</span>
                    <span className="text-neon-blue font-bold">14,242/s</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-gray-500 font-semibold text-center">DEC_INTEG:</span>
                    <span className="text-neon-green font-bold">100% SECURE</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1 bg-neon-blue/10 px-2 py-0.5 rounded border border-neon-blue/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-blue inline-block animate-ping" />
                  <span className="text-neon-blue font-bold uppercase tracking-wider">SECURE SHIELD LOADED</span>
                </div>
              </div>

            </div>

            {/* Bottom Accent Decorative elements */}
            <div className="absolute -bottom-5 right-5 font-mono text-[9px] text-gray-600/60 pointer-events-none select-none flex space-x-3">
              <span>LAT_REF: 43.1209° N, 142.9234° E</span>
              <span>NODE_SRC: IPV6_ENABLED</span>
            </div>
            <div className="absolute -bottom-5 left-5 font-mono text-[9px] text-neon-blue/30 pointer-events-none select-none">
              [CRITICAL_INFRASTRUCTURE_PROT]
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
