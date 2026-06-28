import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LucideIcon } from './LucideIcon';
import { ThreatEvent } from './types';

export default function StatsDashboard() {
  const [activeTab, setActiveTab] = useState<'threat-feed' | 'integrity-check'>('threat-feed');
  const [threatEvents, setThreatEvents] = useState<ThreatEvent[]>([]);
  const [sysIntegrityStatus, setSysIntegrityStatus] = useState<string>('PROTECTED');
  const [firewallBlockedCount, setFirewallBlockedCount] = useState<number>(3142908);
  const [cpuLoad, setCpuLoad] = useState<number>(14);

  // Generate mock events
  const generateRandomEvent = (): ThreatEvent => {
    const types: ThreatEvent['type'][] = ['DDoS Attack', 'SQL Injection', 'Phishing Attempt', 'Malware Execution', 'Port Scan'];
    const countries = ['Rússia', 'China', 'Irã', 'Ucrânia5', 'EUA', 'Coreia do Norte', 'Alemanha', 'França', 'Brasil'];
    const targets = ['Mainframe-DB', 'Gateway-API-East', 'OAuth-Auth-Node', 'Vault-Key-Cluster', 'Edge-CDN-Br'];
    const statuses: ThreatEvent['status'][] = ['BLOCKED', 'MITIGATED', 'ISOLATED'];
    const risks: ThreatEvent['risk'][] = ['CRITICAL', 'HIGH', 'MEDIUM'];

    const chosenType = types[Math.floor(Math.random() * types.length)];
    const chosenStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const chosenRisk = chosenType === 'DDoS Attack' || chosenType === 'Malware Execution' ? 'CRITICAL' : risks[Math.floor(Math.random() * risks.length)];

    return {
      id: Math.random().toString(36).substring(2, 9).toUpperCase(),
      timestamp: new Date().toLocaleTimeString(),
      ip: `${Math.floor(Math.random() * 223) + 1}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      country: countries[Math.floor(Math.random() * countries.length)],
      type: chosenType,
      target: targets[Math.floor(Math.random() * targets.length)],
      status: chosenStatus,
      risk: chosenRisk,
    };
  };

  // Setup seed logs on load
  useEffect(() => {
    const initialEvents = Array.from({ length: 5 }, () => generateRandomEvent());
    setThreatEvents(initialEvents);

    // Dynamic stats loops
    const eventInterval = setInterval(() => {
      setThreatEvents((prev) => {
        const next = [generateRandomEvent(), ...prev];
        if (next.length > 6) next.pop();
        return next;
      });
      // Increment threats blocked counter
      setFirewallBlockedCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 4000);

    const cpuInterval = setInterval(() => {
      setCpuLoad((prev) => {
        const change = Math.floor(Math.random() * 5) - 2;
        const next = prev + change;
        return next < 3 ? 3 : next > 25 ? 25 : next;
      });
    }, 2000);

    return () => {
      clearInterval(eventInterval);
      clearInterval(cpuInterval);
    };
  }, []);

  return (
    <section id="cases" className="relative py-24 bg-bg-cyber overflow-hidden border-t border-gray-900">
      <div className="absolute inset-0 cyber-grid opacity-10" />
      <div className="absolute top-[30%] right-[-10%] w-[450px] h-[450px] bg-neon-blue/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 animate-fade-in">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase text-neon-blue tracking-widest font-bold">
            05 // TELEMETRIA EM TEMPO REAL E MATRIZES
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-3 tracking-tight">
            Métricas de Impacto e <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">Segurança</span>
          </h2>
          <p className="text-gray-400 mt-4 text-sm sm:text-base">
            Visualize as magnitudes do nosso escudo operacional ativo contra atacantes governamentais e ataques cibernéticos em escala corporativa mundial.
          </p>
        </div>

        {/* 6. GRAPHICS AND DASHBOARD COCKPIT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* STATS LEFT PANEL: OVERSIZED COUNTER BADGES (4 required stats) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            
            {/* 1. +120 sistemas protegidos */}
            <div className="glass-panel p-6 rounded-2xl border border-gray-800 relative hover:border-neon-blue/40 transition-all duration-300">
              <span className="absolute top-4 right-5 font-mono text-[9px] text-gray-500">SYS_PROTECTED</span>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-neon-blue/10 rounded-xl text-neon-blue">
                  <LucideIcon name="server" className="w-5.5 h-5.5" color="blue" />
                </div>
                <div>
                  <h3 className="font-display text-3xl font-black text-white leading-none tracking-tight">
                    +120
                  </h3>
                  <span className="text-gray-200 text-sm font-semibold tracking-wide block mt-1.5 leading-snug">
                    Sistemas Protegidos Ativos
                  </span>
                </div>
              </div>
              <p className="text-gray-400 font-sans text-xs mt-3 leading-relaxed">
                Nós estratégicos, datacenters bancários e servidores governamentais integrados.
              </p>
            </div>

            {/* 2. 99.9% uptime */}
            <div className="glass-panel p-6 rounded-2xl border border-gray-800 relative hover:border-neon-purple/40 transition-all duration-300">
              <span className="absolute top-4 right-5 font-mono text-[9px] text-gray-500">SYSTEM_AVAILABILITY</span>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-neon-purple/10 rounded-xl text-neon-purple">
                  <LucideIcon name="clock" className="w-5.5 h-5.5" color="purple" />
                </div>
                <div>
                  <h3 className="font-display text-3xl font-black text-white leading-none tracking-tight">
                    99.98%
                  </h3>
                  <span className="text-gray-200 text-sm font-semibold tracking-wide block mt-1.5 leading-snug">
                    Uptime Operacional Garantido
                  </span>
                </div>
              </div>
              <p className="text-gray-400 font-sans text-xs mt-3 leading-relaxed">
                Zero interrupção de negócios, balanceamento autônomo e failover em nuvem quente.
              </p>
            </div>

            {/* 3. +3 milhões de ameaças bloqueadas */}
            <div className="glass-panel p-6 rounded-2xl border border-gray-800 relative hover:border-neon-green/40 transition-all duration-300">
              <span className="absolute top-4 right-5 font-mono text-[9px] text-gray-500">THREATS_DEFENDED</span>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-neon-green/10 rounded-xl text-neon-green">
                  <LucideIcon name="shieldCheck" className="w-5.5 h-5.5" color="green" />
                </div>
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl font-black text-white leading-none tracking-tight">
                    +{firewallBlockedCount.toLocaleString('pt-BR')}
                  </h3>
                  <span className="text-gray-200 text-sm font-semibold tracking-wide block mt-1.5 leading-snug">
                    Ameaças Bloqueadas Ativas
                  </span>
                </div>
              </div>
              <p className="text-gray-400 font-sans text-xs mt-3 leading-relaxed">
                Varreduras de port, requisições de injeção SQL, botnets e ataques de ramsonware contidos.
              </p>
            </div>

            {/* 4. 24/7 monitoramento ativo */}
            <div className="glass-panel p-6 rounded-2xl border border-gray-800 relative hover:border-neon-blue/40 transition-all duration-300">
              <span className="absolute top-4 right-5 font-mono text-[9px] text-gray-500">SECOPS_VIGILANCE</span>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-neon-blue/10 rounded-xl text-neon-blue">
                  <LucideIcon name="activity" className="w-5.5 h-5.5" color="blue" />
                </div>
                <div>
                  <h3 className="font-display text-3xl font-black text-white leading-none tracking-tight">
                    24/7/365
                  </h3>
                  <span className="text-gray-200 text-sm font-semibold tracking-wide block mt-1.5 leading-snug">
                    Monitoramento Ativo Contínuo
                  </span>
                </div>
              </div>
              <p className="text-gray-400 font-sans text-xs mt-3 leading-relaxed">
                Patrulhamento contínuo de canais com triagem militar e incident responders em prontidão.
              </p>
            </div>

          </div>

          {/* RIGHT PANEL: COCKPIT HUD GRAPHICS & LIVE FEEDS */}
          <div className="lg:col-span-8 glass-panel rounded-2xl border border-gray-800 overflow-hidden flex flex-col justify-between shadow-2xl relative">
            
            {/* Screen static blur overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-bg-cyber/90 via-transparent to-transparent pointer-events-none z-0" />

            {/* Header section toggle dashboard tab */}
            <div className="relative border-b border-gray-800 px-6 py-4 bg-black-deep/75 flex flex-col sm:flex-row items-center justify-between gap-4 z-10">
              <div className="flex items-center space-x-3 text-left">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neon-green"></span>
                </span>
                <div>
                  <span className="font-display font-bold text-sm text-white block">
                    BLACKSHIELD LIVE SOC DASHBOARD // SEC_MONITOR
                  </span>
                  <span className="text-[10px] font-mono text-gray-400">
                    DIRETRIZ MATRIZ DE SEGURANÇA NACIONAL COM INTELIGÊNCIA ARTIFICIAL
                  </span>
                </div>
              </div>

              {/* Toggle indicators console */}
              <div className="flex bg-black-deep rounded border border-gray-850 p-0.5 self-stretch sm:self-auto text-center">
                <button
                  onClick={() => setActiveTab('threat-feed')}
                  className={`flex-1 sm:flex-none font-mono text-[9px] font-bold px-3 py-1.5 rounded transition-all ${
                    activeTab === 'threat-feed' ? 'bg-neon-blue/15 text-neon-blue border border-neon-blue/30' : 'text-gray-500 hover:text-white'
                  }`}
                >
                  LIVE THREAT MONITOR
                </button>
                <button
                  onClick={() => setActiveTab('integrity-check')}
                  className={`flex-1 sm:flex-none font-mono text-[9px] font-bold px-3 py-1.5 rounded transition-all ${
                    activeTab === 'integrity-check' ? 'bg-neon-purple/20 text-neon-purple border border-neon-purple/35' : 'text-gray-500 hover:text-white'
                  }`}
                >
                  INTEGRITY COEFFICIENTS
                </button>
              </div>
            </div>

            {/* Dashboard Visual Content */}
            <div className="relative p-6 flex-1 flex flex-col justify-between space-y-6 z-10">
              
              {activeTab === 'threat-feed' ? (
                /* LIVE THREAT FEED INTERACTIVE MATRIX */
                <div className="flex-1 flex flex-col">
                  {/* Stats graphics: custom responsive SVG line curves depicting cyber peak spikes */}
                  <div className="mb-6 bg-black-deep/60 p-4 rounded-xl border border-gray-900">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[9px] text-gray-400">ATTACK LOAD STRESS CURVE (LIVESTREAM)</span>
                      <span className="font-mono text-[9px] text-neon-blue font-bold tracking-widest animate-pulse">
                        SAMPLEDRATE: 100MS // LATENCY: 0.04MS
                      </span>
                    </div>

                    <div className="h-24 w-full relative">
                      {/* Responsive Styled SVG curve */}
                      <svg viewBox="0 0 500 100" className="w-full h-full" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="cyberCurveGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#00D1FF" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#7B2EFF" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        {/* Grid lines */}
                        <line x1="0" y1="20" x2="500" y2="20" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                        <line x1="0" y1="50" x2="500" y2="50" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                        <line x1="0" y1="80" x2="500" y2="80" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />

                        {/* Interactive Curve Path with visual spikes */}
                        <path
                          d="M0,80 Q30,75 50,40 T100,60 T150,20 T200,70 T250,50 T300,15 T350,65 T400,30 T450,55 T500,70"
                          fill="none"
                          stroke="url(#cyberCurveGrad)"
                          strokeWidth="3"
                          className="stroke-neon-blue drop-shadow-[0_0_8px_rgba(0,209,255,0.5)]"
                        />
                        <path
                          d="M0,80 Q30,75 50,40 T100,60 T150,20 T200,70 T250,50 T300,15 T350,65 T400,30 T450,55 T500,70 L500,100 L0,100 Z"
                          fill="url(#cyberCurveGrad)"
                        />
                        {/* Red Dot indicating anomaly intercept */}
                        <circle cx="300" cy="15" r="4" fill="#FF5555" className="animate-ping" />
                        <circle cx="300" cy="15" r="3.5" fill="#FF5555" />
                        <text x="310" y="18" fill="#FF5555" fontSize="6" fontFamily="monospace" fontWeight="bold">DDOS_SPIKE_MITIGATED</text>
                      </svg>
                    </div>
                  </div>

                  {/* Threat Feed logs lists */}
                  <div className="flex-1 overflow-x-auto">
                    <table className="w-full text-left border-collapse font-mono text-[9px] text-gray-400">
                      <thead>
                        <tr className="border-b border-gray-800 pb-2 text-gray-500">
                          <th className="py-2.5 uppercase font-medium">TIMESTAMP</th>
                          <th className="py-2.5 uppercase font-medium">ATTACKER IP</th>
                          <th className="py-2.5 uppercase font-medium">TYPE</th>
                          <th className="py-2.5 uppercase font-medium">TARGET ASSET</th>
                          <th className="py-2.5 uppercase font-medium">SEVERITY</th>
                          <th className="py-2.5 uppercase font-medium text-right">STATUS</th>
                        </tr>
                      </thead>
                      <tbody>
                        <AnimatePresence initial={false}>
                          {threatEvents.map((evt) => {
                            const isCritical = evt.risk === 'CRITICAL';
                            const badgeColor = isCritical ? 'text-red-400 bg-red-950/30 border-red-500/20' : 'text-yellow-400 bg-yellow-950/20 border-yellow-500/15';
                            
                            return (
                              <motion.tr
                                key={evt.id}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="border-b border-gray-900 hover:bg-white/[0.02]"
                              >
                                <td className="py-2.5 text-gray-500 font-bold">{evt.timestamp}</td>
                                <td className="py-2.5 text-slate-300 font-bold">{evt.ip} <span className="text-[7.5px] text-gray-500">({evt.country})</span></td>
                                <td className="py-2.5 text-neon-blue">{evt.type}</td>
                                <td className="py-2.5 text-slate-400 font-semibold">{evt.target}</td>
                                <td className="py-2.5">
                                  <span className={`px-2 py-0.5 rounded border text-[8px] font-black ${badgeColor}`}>
                                    {evt.risk}
                                  </span>
                                </td>
                                <td className="py-2.5 text-right font-black text-neon-green">
                                  <span className="inline-flex items-center space-x-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-neon-green inline-block animate-pulse" />
                                    <span>{evt.status}</span>
                                  </span>
                                </td>
                              </motion.tr>
                            );
                          })}
                        </AnimatePresence>
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                /* COEFFICIENTS AND ACTIVE INTEGRITY CHECKS */
                <div className="flex-1 space-y-6">
                  
                  {/* 3 Progress Bars matching requested HUD visualizer */}
                  <div className="space-y-4">
                    
                    {/* Bar 1 */}
                    <div>
                      <div className="flex justify-between font-mono text-[9px] mb-1.5">
                        <span className="text-gray-400">EDR AGENT CRYPTOGRAPHIC COUPLING RATE:</span>
                        <span className="text-neon-blue font-bold">100% OK_SEALED</span>
                      </div>
                      <div className="h-2 bg-black-deep rounded-full overflow-hidden border border-gray-850">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 1.5 }}
                          className="h-full bg-gradient-to-r from-neon-blue to-neon-purple rounded-full shadow-[0_0_8px_#00D1FF]"
                        />
                      </div>
                    </div>

                    {/* Bar 2 */}
                    <div>
                      <div className="flex justify-between font-mono text-[9px] mb-1.5">
                        <span className="text-gray-400">MALWARE PATTERN HEURISTIC INDEX:</span>
                        <span className="text-neon-green font-bold">99.94% INTEGRITY</span>
                      </div>
                      <div className="h-2 bg-black-deep rounded-full overflow-hidden border border-gray-850">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '99.94%' }}
                          transition={{ duration: 1.5, delay: 0.2 }}
                          className="h-full bg-gradient-to-r from-neon-green to-neon-blue rounded-full shadow-[0_0_8px_#00FF9D]"
                        />
                      </div>
                    </div>

                    {/* Bar 3 */}
                    <div>
                      <div className="flex justify-between font-mono text-[9px] mb-1.5">
                        <span className="text-gray-400">ACTIVE FIREWALL STABILITY COEFFICIENT:</span>
                        <span className="text-neon-purple font-bold">99.99% PERFECT_FIT</span>
                      </div>
                      <div className="h-2 bg-black-deep rounded-full overflow-hidden border border-gray-850">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '99.99%' }}
                          transition={{ duration: 1.5, delay: 0.4 }}
                          className="h-full bg-gradient-to-r from-neon-purple to-neon-blue rounded-full shadow-[0_0_8px_#7B2EFF]"
                        />
                      </div>
                    </div>

                  </div>

                  {/* Secondary stats panels row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-black-deep/50 p-4 rounded-xl border border-gray-900 text-left">
                      <span className="font-mono text-[8px] text-gray-500 block uppercase mb-1">COGNITIVE SOAR LATENCY</span>
                      <span className="font-display text-xl font-bold text-white block">0.05 Milissegundos</span>
                      <p className="text-[10px] text-gray-400 mt-2 font-mono">Fila de Playbooks automatizados acionando em milissegundos.</p>
                    </div>

                    <div className="bg-black-deep/50 p-4 rounded-xl border border-gray-900 text-left">
                      <span className="font-mono text-[8px] text-gray-500 block uppercase mb-1">SOC SIMULATION LOAD</span>
                      <span className="font-display text-xl font-bold text-neon-blue block">{cpuLoad}% CAPACIDADE RESTRITA</span>
                      <p className="text-[10px] text-gray-400 mt-2 font-mono font-normal">Escaneamento comportamental em tempo real ativo.</p>
                    </div>
                  </div>

                </div>
              )}

            </div>

            {/* Dashboard Footer info indicators */}
            <div className="bg-black-deep/90 border-t border-gray-800/80 px-6 py-4 flex flex-col sm:flex-row gap-3 justify-between items-center z-10 font-mono text-[8.5px]">
              <div className="flex items-center space-x-4">
                <span className="inline-flex items-center space-x-1 text-gray-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-blue inline-block" />
                  <span>GPS COORDS: SEC_SOC_EAST_SÃO_PAULO</span>
                </span>
                <span className="text-gray-500">|</span>
                <span className="text-neon-green">ACTIVE SHIELDS: ARMED / READY</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-900 border border-gray-850 px-2 py-0.5 rounded text-gray-400">
                <LucideIcon name="refresh" className="w-3 h-3 animate-spin duration-3000" color="blue" />
                <span>FREQUÊNCIA RETENTIVA: 1.25GHZ</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
