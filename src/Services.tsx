import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LucideIcon } from './LucideIcon';
import { Service } from './types';

export default function Services() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const servicesList: Service[] = [
    {
      id: 'pentest',
      title: 'Penetration Testing',
      description: 'Ataques éticos simulados e exaustivos contra as suas redes, servidores e aplicações web para descobrir vulnerabilidades críticas exploráveis antes que adversários reais as encontrem.',
      iconName: 'terminal',
      badge: 'RED_TEAM'
    },
    {
      id: 'monitoramento',
      title: 'Monitoramento 24/7',
      description: 'Vigilância contínua e incansável de todos os eventos operacionais de rede, endpoints e datacenters com alertas automatizados de telemetria em tempo real.',
      iconName: 'activity',
      badge: 'LIVE_SOC'
    },
    {
      id: 'ransomware',
      title: 'Proteção contra Ransomware',
      description: 'Mecanismos de detecção proativa e bloqueio comportamental antissequestro de dados corporativos baseados em heurística inteligente de modificações de arquivos.',
      iconName: 'shield',
      badge: 'NEXT_GEN'
    },
    {
      id: 'cloud-security',
      title: 'Cloud Security',
      description: 'Varreduras sofisticadas de infraestruturas AWS, Microsoft Azure e Google Cloud, garantindo configurações resilientes e impedindo vazamento de dados confidenciais.',
      iconName: 'cloud',
      badge: 'CSPM'
    },
    {
      id: 'auditoria',
      title: 'Auditoria de Segurança',
      description: 'Inspeção profunda e formal de arquiteturas de software, códigos-fonte críticos e processos corporativos em conformidade rigorosa com normas ISO 27001 e CIS.',
      iconName: 'fileCheck',
      badge: 'GOVERNANCE'
    },
    {
      id: 'analise-vuln',
      title: 'Análise de Vulnerabilidades',
      description: 'Varreduras automáticas integradas a pipelines de CI/CD para catalogar lacunas e gerenciar ameaças a pacotes de terceiros desatualizados sob risco de exploração ativas.',
      iconName: 'alertTriangle',
      badge: 'PREVENTIVE'
    },
    {
      id: 'lgpd',
      title: 'LGPD Compliance',
      description: 'Adequação legal de fluxos de dados, criação de trilhas de auditoria criptografadas e blindagem de segurança de informações sensíveis sob exigência civil.',
      iconName: 'scale',
      badge: 'PRIVACY'
    },
    {
      id: 'soc',
      title: 'SOC (Security Operations Center)',
      description: 'Operações táticas gerenciadas por times altamente treinados em triagem, contenção de ataques e mitigação de ameaças avançadas em tempo de resposta militar.',
      iconName: 'cpu',
      badge: 'ELITE_DEFENSE'
    },
    {
      id: 'backup-dr',
      title: 'Backup & Disaster Recovery',
      description: 'Estratégias avançadas de espelhamento imutável de dados e planos de recuperação instantânea capazes de restabelecer o core business em minutos pós-incidente.',
      iconName: 'hardDrive',
      badge: 'RESILIENCE'
    }
  ];

  // Specific technical metrics that render inside the interactive mock detail card
  const getTechnicalSpec = (serviceId: string) => {
    const specs: Record<string, { framework: string; latency: string; protocol: string; tools: string[] }> = {
      pentest: {
        framework: 'OWASP / PTES / OSSTMM Manual Checks',
        latency: 'On-demand / Quarterly Schedules',
        protocol: 'Black/Grey/White-Box simulated vector matching',
        tools: ['Metasploit Pro', 'Burp Suite Enterprise', 'BloodHound', 'Nmap', 'Custom Exploit Kits']
      },
      monitoramento: {
        framework: 'SIEM Core / EDR Agent Mapping',
        latency: 'Sub-second real-time trace pipelines',
        protocol: 'Heurístico adaptativo via Machine Learning',
        tools: ['Elastic Sec', 'CrowdStrike Falcon', 'SentinelOne API', 'Misp Thread Integration']
      },
      ransomware: {
        framework: 'Zero-trust Immutable File Integrity (FIM)',
        latency: 'Instante de detecção de tentativa de escalação (<50ms)',
        protocol: 'Process-Isolation Kernel Hooking Filter',
        tools: ['Kernel Filter Hooks', 'Volume Shadow Protectors', 'Autonomous Process Terminators']
      },
      'cloud-security': {
        framework: 'CIS Benchmarks / NIST Cloud Frameworks',
        latency: 'Frequência de scan a cada hora ou gatilhos IAC',
        protocol: 'Direct Cryptographic AWS/GC/Azure API telemetry',
        tools: ['Prisma Cloud', 'Checkov', 'AWS GuardDuty Integration', 'Azure Sentinel Def']
      },
      auditoria: {
        framework: 'ISO 27001:2022 / SOC 2 Type II / NIST CSF',
        latency: 'Relatórios consolidados gerados em até 10 dias',
        protocol: 'Deep evidence and policy trace matching',
        tools: ['Drata Core Engine', 'Vanta Automatic Evidence Collectors', 'Source-Code SAST Tools']
      },
      'analise-vuln': {
        framework: 'CVSS v3.1 Impact Matrices & Rating',
        latency: 'Continuous scan / Pipeline Integration',
        protocol: 'NVD feeds mapping with machine prioritize scoring',
        tools: ['Tenable Nessus Pro', 'Snyk Developer Security', 'Qualys VMDR Scanner']
      },
      lgpd: {
        framework: 'Lei Geral de Proteção de Dados (Br) / GDPR',
        latency: 'Auditoria e classificação estrutural contínua',
        protocol: 'DLP (Data Loss Prevention) / PII Cripto-Anonymizing',
        tools: ['OneTrust', 'Securiti.ai Data Catalogs', 'Active Encryption at rest & transit']
      },
      soc: {
        framework: 'MITRE ATT&CK Matrix alignment mapping',
        latency: 'Resposta imediata de Engenheiros de SOC (<15min L3)',
        protocol: 'Triage de alertas e playbook automatizado SOAR',
        tools: ['Splunk Phantom', 'Demisto SOAR Playbooks', 'Cortex XSOAR Matrix']
      },
      'backup-dr': {
        framework: 'ISO 22301 Business Continuity Standard',
        latency: 'RPO (Recovery Point) < 1h / RTO (Recovery Time) < 15min',
        protocol: 'Immutable Object Lock / Air-Gapped Repositories',
        tools: ['Veeam Platform Backup', 'AWS S3 Immutable Vaults', 'Active Cloud Hot-site failover']
      }
    };

    return specs[serviceId] || {
      framework: 'NIST Framework Compliance',
      latency: 'Instantaneos alert channels',
      protocol: 'Zero Trust Authorization',
      tools: ['Secure Shield Proprietary Stack']
    };
  };

  return (
    <section id="servicos" className="relative py-24 bg-bg-cyber/95 overflow-hidden border-t border-gray-900">
      {/* Background cyber overlay */}
      <div className="absolute inset-0 cyber-grid-dense opacity-15" />
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-purple/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="font-mono text-xs uppercase text-neon-purple tracking-widest font-bold">
            02 // PORTFÓLIO DE PROTEÇÃO CORPORATIVA
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-3 tracking-tight">
            Advanced Cybersecurity <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-neon-blue to-neon-green">Solutions</span>
          </h2>
          <p className="text-gray-400 mt-4 text-sm sm:text-base">
            Módulos integrados de defesa tática, mitigação de invasões e conformidade regulatória para conter ameaças e assegurar a soberania digital da sua empresa.
          </p>
        </div>

        {/* 3. GRID PREMIUM RESPONSIVO COMPLETO (9 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="glass-panel p-8 rounded-2xl relative flex flex-col justify-between group overflow-hidden border border-gray-800 hover:border-neon-blue/35 hover:shadow-[0_15px_30px_rgba(0,209,255,0.12)] transition-all duration-300"
            >
              {/* Light corner decoration that changes intensity on hover */}
              <div className="absolute top-0 right-0 w-12 h-[1px] bg-gradient-to-l from-neon-blue to-transparent opacity-40 group-hover:opacity-100 group-hover:w-20 transition-all" />
              <div className="absolute top-0 right-0 w-[1px] h-12 bg-gradient-to-b from-neon-blue to-transparent opacity-40 group-hover:opacity-100 group-hover:h-20 transition-all" />

              <div>
                {/* Tech Code Index & Badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-[9px] text-gray-500 tracking-wider">
                    MODULE_SYS_0{idx + 1}
                  </span>
                  {service.badge && (
                    <span className="font-mono text-[8.5px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-gray-400 font-bold group-hover:text-neon-blue group-hover:border-neon-blue/20 transition-all">
                      {service.badge}
                    </span>
                  )}
                </div>

                {/* Cyber Iconic Head */}
                <div className="w-12 h-12 rounded-xl bg-black-deep/50 border border-gray-800/80 group-hover:border-neon-blue/40 flex items-center justify-center text-neon-blue group-hover:scale-110 transition-transform duration-300 shadow-inner">
                  <LucideIcon name={service.iconName} className="w-5.5 h-5.5" color="blue" />
                </div>

                {/* Title */}
                <h3 className="font-display text-xl font-bold text-white mt-5 group-hover:text-neon-blue transition-all">
                  {service.title}
                </h3>

                {/* Short Paragraph Description */}
                <p className="text-gray-400 font-sans text-xs sm:text-sm mt-3.5 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Saiba Mais Trigger CTA Button */}
              <div className="mt-8 pt-4 border-t border-gray-900">
                <button
                  onClick={() => setSelectedService(service)}
                  className="font-display text-xs font-bold text-neon-blue hover:text-white transition-all duration-300 tracking-wider flex items-center space-x-1 uppercase select-none cursor-pointer"
                >
                  <span>Saiba Mais Spec Sheet</span>
                  <LucideIcon name="externalLink" className="w-3.5 h-3.5" color="blue" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* INTERACTIVE DETAILS MOCK SPEC MODAL */}
        <AnimatePresence>
          {selectedService && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-2xl bg-bg-cyber border border-neon-blue rounded-2xl shadow-[0_20px_50px_rgba(0,209,255,0.25)] overflow-hidden"
              >
                {/* Header HUD info bar */}
                <div className="flex items-center justify-between border-b border-gray-800 bg-black-deep/80 px-6 py-4">
                  <div className="flex items-center space-x-2.5">
                    <div className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-blue opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-blue"></span>
                    </div>
                    <span className="font-mono text-xs text-neon-blue tracking-widest uppercase font-bold">
                      Blackshield SEC_SHEET_DECRYPTED
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="p-1.5 rounded-md hover:bg-white/5 text-gray-400 hover:text-white transition-all select-none focus:outline-none"
                    aria-label="Close details"
                  >
                    <LucideIcon name="x" className="w-5 h-5 text-gray-300" />
                  </button>
                </div>

                {/* Decoded content panel */}
                <div className="p-6 sm:p-8 space-y-6">
                  {/* Service Core Info */}
                  <div className="flex items-start space-x-4">
                    <div className="p-3.5 rounded-xl bg-neon-blue/10 border border-neon-blue/40 text-neon-blue">
                      <LucideIcon name={selectedService.iconName} className="w-6.5 h-6.5" color="blue" />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-black text-white leading-tight">
                        {selectedService.title}
                      </h3>
                      <p className="font-mono text-[9px] text-neon-green uppercase tracking-widest mt-1">
                        MODULE CLASSIFIED // SECOPS INTEGRAL RATING
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-300 font-sans text-sm leading-relaxed border-b border-gray-900 pb-5">
                    {selectedService.description}
                  </p>

                  {/* Technical Spec Matrix details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-black-deep/50 p-4 rounded-lg border border-gray-900">
                      <span className="block font-mono text-[9px] text-gray-500 uppercase tracking-widest mb-1">
                        FRAMEWORKS COMPATÍVEIS
                      </span>
                      <span className="font-display text-xs text-white uppercase font-bold block">
                        {getTechnicalSpec(selectedService.id).framework}
                      </span>
                    </div>
                    <div className="bg-black-deep/50 p-4 rounded-lg border border-gray-900">
                      <span className="block font-mono text-[9px] text-gray-500 uppercase tracking-widest mb-1">
                        TEMPO DE RESPOSTA MÉDIO
                      </span>
                      <span className="font-display text-xs text-neon-green uppercase font-bold block">
                        {getTechnicalSpec(selectedService.id).latency}
                      </span>
                    </div>
                    <div className="bg-black-deep/50 p-4 rounded-lg border border-gray-900 sm:col-span-2">
                      <span className="block font-mono text-[9px] text-gray-500 uppercase tracking-widest mb-1">
                        MÉTODO E PROTOCOLO TÉCNICO
                      </span>
                      <span className="font-sans text-xs text-slate-300 block">
                        {getTechnicalSpec(selectedService.id).protocol}
                      </span>
                    </div>
                  </div>

                  {/* Operational stack / software utilized */}
                  <div>
                    <span className="block font-mono text-[9px] text-gray-500 uppercase tracking-widest mb-2.5">
                      STACK DE TECNOLOGIA OPERACIONAL INSERIDA
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {getTechnicalSpec(selectedService.id).tools.map((tool, index) => (
                        <span
                          key={index}
                          className="font-mono text-[9px] bg-slate-900/80 border border-gray-800 text-neon-blue px-2.5 py-1 rounded"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer close CTAs trigger with simulated action feedback */}
                <div className="bg-black-deep/60 px-6 py-4.5 border-t border-gray-800/80 flex flex-col sm:flex-row gap-3 justify-between items-center">
                  <div className="font-mono text-[8.5px] text-gray-500">
                    MATCH CODE // AUDIT: OK-AUTONOMOUS
                  </div>
                  <div className="flex space-x-3 w-full sm:w-auto">
                    <button
                      onClick={() => setSelectedService(null)}
                      className="flex-1 sm:flex-initial px-5 py-2.5 border border-gray-700 hover:border-neon-purple text-xs font-semibold text-gray-300 hover:text-white rounded select-none cursor-pointer"
                    >
                      Voltar ao Console
                    </button>
                    <a
                      href="#contato"
                      onClick={() => setSelectedService(null)}
                      className="flex-1 sm:flex-initial text-center px-5 py-2.5 bg-gradient-to-r from-neon-blue to-neon-purple text-black-deep text-xs font-bold rounded hover:shadow-[0_0_12px_rgba(0,209,255,0.4)] transition-all select-none cursor-pointer"
                    >
                      Consultar este Módulo
                    </a>
                  </div>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
