import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from './LucideIcon';

export default function TechCertifications() {
  const certs = [
    {
      code: 'REG_ISO_27001',
      name: 'ISO 27001:2022',
      category: 'Sistemas de Gestão de Segurança',
      description: 'Selo máximo internacional de integridade e auditoria estrutural para tratamento confidencial e privacidade de informações sigilosas.',
      badgeColor: 'blue',
      icon: 'award'
    },
    {
      code: 'DEV_OWASP_ALIGNED',
      name: 'OWASP Top 10 Active',
      category: 'Segurança de Aplicação Web',
      description: 'Metodologia operacional certificada e em total sintonia para conter ataques de injeção, cross-site scripting e falhas criptográficas.',
      badgeColor: 'purple',
      icon: 'terminal'
    },
    {
      code: 'PARTNER_AWS_SEC',
      name: 'AWS Security Advanced',
      category: 'Conformidade e Proteção em Nuvem',
      description: 'Integração natively automatizada a perímetros e controle IAM de servidores Amazon Web Services sem perda de performance operacional.',
      badgeColor: 'green',
      icon: 'cloud'
    },
    {
      code: 'PARTNER_MS_SEC',
      name: 'Microsoft Security Partner',
      category: 'Ecosystem Protections',
      description: 'Conectividade imediata a ferramentas de SOC e playbooks de mitigação de incidentes do Azure Active Directory e Sentinel.',
      badgeColor: 'blue',
      icon: 'lockKeyhole'
    },
    {
      code: 'NETWORK_CLOUDFLARE_ENT',
      name: 'Cloudflare Strategic Provider',
      category: 'Borda e Proteção DDoS',
      description: 'Utilização e otimização avançada de proxies WAF mundiais capazes de absorver e isolar terabytes de tráfego nocivo de borda.',
      badgeColor: 'purple',
      icon: 'activity'
    },
    {
      code: 'POLICY_ZERO_TRUST',
      name: 'NIST Zero Trust Compliant',
      category: 'Sistemas de Controle de Acesso',
      description: 'Autenticação continuada contextual baseada na diretriz militar NIST SP 800-207. Todo acesso é individualmente inspecionado.',
      badgeColor: 'green',
      icon: 'shieldCheck'
    }
  ];

  const partners = [
    { name: 'CrowdStrike Falcon', type: 'EDR Alliance' },
    { name: 'Palo Alto Networks', type: 'Next-Gen Firewall Tech' },
    { name: 'SentinelOne Core', type: 'AI-Heuristics Threat Engine' },
    { name: 'HashiCorp Vault', type: 'Strategic Secret Management' },
    { name: 'Fortinet Advanced', type: 'Hardware Intrusion Protec' },
    { name: 'Okta Enterprise', type: 'Identity & Access Mgmt' }
  ];

  return (
    <section id="tecnologias" className="relative py-24 bg-bg-cyber/95 overflow-hidden border-t border-gray-900">
      <div className="absolute inset-0 cyber-grid opacity-10" />
      <div className="absolute bottom-[10%] left-[-10%] w-[350px] h-[350px] bg-neon-purple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase text-neon-green tracking-widest font-bold">
            04 // CERTIFICAÇÕES, PARCEIROS E NORMAS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-3 tracking-tight">
            Tecnologias & <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green via-neon-blue to-neon-purple">Certificações</span>
          </h2>
          <p className="text-gray-400 mt-4 text-sm sm:text-base">
            Operamos sob as mais rígidas diretrizes, regulamentos internacionais e certificações globais para assegurar a idoneidade técnica absoluta e governança impecável.
          </p>
        </div>

        {/* Certifications main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certs.map((cert, idx) => (
            <motion.div
              key={cert.code}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="glass-panel p-6 sm:p-8 rounded-2xl relative border border-gray-800 hover:border-neon-green/35 transition-all group duration-300"
            >
              {/* Corner badge code */}
              <span className="absolute top-4 right-5 font-mono text-[8px] text-gray-500 tracking-wider">
                [{cert.code}]
              </span>

              {/* Icon & Label info */}
              <div className="flex items-center space-x-3.5 mb-5">
                <div className="w-11 h-11 rounded-lg bg-black-deep border border-gray-850 flex items-center justify-center text-neon-green group-hover:scale-105 transition-transform">
                  <LucideIcon name={cert.icon} className="w-5.2 h-5.2" color={cert.badgeColor as 'blue' | 'purple' | 'green' | 'gray' | 'default'} />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white group-hover:text-neon-green transition-colors leading-tight">
                    {cert.name}
                  </h3>
                  <span className="block text-[10px] font-mono text-gray-400 mt-0.5">
                    {cert.category}
                  </span>
                </div>
              </div>

              {/* Description body */}
              <p className="text-gray-300 font-sans text-xs leading-relaxed">
                {cert.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Partners alliance ticker layout */}
        <div className="mt-20 border-t border-gray-900 pt-16">
          <div className="text-center mb-10">
            <h4 className="font-mono text-[10px] text-gray-400 uppercase tracking-widest font-bold">
              ESTRATÉGIAS DE COMBATE ATIVO // ALIANÇA DE ECOSSISTEMAS
            </h4>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {partners.map((partner, idx) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="glass-panel px-4 py-5 rounded-xl border border-gray-900 hover:border-neon-purple/40 hover:bg-black-deep/40 text-center transition-all group cursor-default"
              >
                <span className="block font-display text-sm font-semibold text-white tracking-wide group-hover:text-neon-purple transition-colors">
                  {partner.name}
                </span>
                <span className="block font-mono text-[8px] text-gray-500 mt-1 uppercase tracking-wider">
                  {partner.type}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
