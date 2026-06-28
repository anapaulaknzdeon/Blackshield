import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LucideIcon } from './LucideIcon';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const [txState, setTxState] = useState<'idle' | 'encrypting' | 'sent'>('idle');
  const [txLogs, setTxLogs] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Simulate cyber encrypted upload transmission
    setTxState('encrypting');
    setTxLogs([]);

    const simSteps = [
      'SYS: Initializing GPG asymmetric keystore connection...',
      'CRYPT: Matching local public key [RSA-4096_BLACKSHIELD]...',
      'PACKET: Encrypted JSON format envelope compiled.',
      'TUNNEL: Opening TLS v1.3 isolated transmission socket (PORT:443)...',
      'ROUTING: Redirecting packet packet payload via São Paulo SECOPS Gate...',
      'COMPLETE: Transmission success. GCM Hash: 0xFEE891BA verified SECURE.',
    ];

    let step = 0;
    const interval = setInterval(() => {
      if (step < simSteps.length) {
        setTxLogs((prev) => [...prev, simSteps[step]]);
        step++;
      } else {
        clearInterval(interval);
        setTxState('sent');
      }
    }, 700);
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', company: '', message: '' });
    setTxState('idle');
    setTxLogs([]);
  };

  return (
    <section id="contato" className="relative py-24 bg-bg-cyber overflow-hidden border-t border-gray-900">
      <div className="absolute inset-0 cyber-grid opacity-10" />
      <div className="absolute top-[40%] left-[-10%] w-[450px] h-[450px] bg-neon-purple/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[450px] h-[450px] bg-neon-blue/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase text-neon-blue tracking-widest font-bold">
            09 // PONTO DE ENTRADA DO PERÍMETRO DE DEFESA
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-3 tracking-tight">
            Fale com nossos <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">Especialistas</span>
          </h2>
          <p className="text-gray-400 mt-4 text-sm sm:text-base">
            Inicie um canal criptografado direto para avaliação detalhada dos seus riscos operacionais com nossa liderança técnica.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* LEFT SIDE: COMPANY INFO & DIGITAL FUTURISTIC MAP MATRIX */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6 text-left">
              <span className="font-mono text-[10px] text-neon-green tracking-[0.2em] uppercase font-bold">
                [ CONTATO PRINCIPAL  ]
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                “Fale com nossos especialistas em segurança digital.”
              </h3>
              <p className="text-gray-450 font-sans text-xs sm:text-sm leading-relaxed">
                Nossos analistas da divisão tática de Red Team e governança regulatória estão de prontidão para desenhar a blindagem ideal de dados da sua corporação.
              </p>

              {/* Company Info icons */}
              <div className="space-y-4 pt-4">
                
                {/* 1. Email */}
                <div className="flex items-start space-x-3.5 group">
                  <div className="w-10 h-10 rounded-lg bg-black-deep border border-gray-850 flex items-center justify-center text-neon-blue group-hover:border-neon-blue/35 transition-colors shadow">
                    <LucideIcon name="mail" className="w-4.5 h-4.5" color="blue" />
                  </div>
                  <div>
                    <span className="block font-mono text-[8px] text-gray-500 uppercase">EMAIL_ENVELOPE</span>
                    <a href="mailto:contato@blackshield.sec" className="font-display text-sm font-bold text-white hover:text-neon-blue transition-colors">
                      contato@blackshield.sec
                    </a>
                  </div>
                </div>

                {/* 2. Phone */}
                <div className="flex items-start space-x-3.5 group">
                  <div className="w-10 h-10 rounded-lg bg-black-deep border border-gray-850 flex items-center justify-center text-neon-purple group-hover:border-neon-purple/35 transition-colors shadow">
                    <LucideIcon name="phone" className="w-4.5 h-4.5" color="purple" />
                  </div>
                  <div>
                    <span className="block font-mono text-[8px] text-gray-500 uppercase">SOC_EMERGENCY_24H</span>
                    <a href="tel:+551140049873" className="font-display text-sm font-bold text-white hover:text-neon-purple transition-colors">
                      +55 11 4004-98SEC (24/7)
                    </a>
                  </div>
                </div>

                {/* 3. Location */}
                <div className="flex items-start space-x-3.5 group">
                  <div className="w-10 h-10 rounded-lg bg-black-deep border border-gray-850 flex items-center justify-center text-neon-green group-hover:border-neon-green/35 transition-colors shadow">
                    <LucideIcon name="mapPin" className="w-4.5 h-4.5" color="green" />
                  </div>
                  <div>
                    <span className="block font-mono text-[8px] text-gray-500 uppercase">COORDS_SATELLITE</span>
                    <span className="font-sans text-xs sm:text-sm font-semibold text-gray-300">
                      Av. Paulista, 1000 - Bela Vista - São Paulo, SP
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Futuristic Interlocking connection node Map representation */}
            <div className="bg-black-deep/60 p-4 rounded-2xl border border-gray-900 flex flex-col justify-between overflow-hidden relative min-h-[160px]">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[8.5px] text-gray-400">GLOBAL DATACENTER CONNECTION HUBS // SEC_WAN</span>
                <span className="font-mono text-[8px] text-neon-blue animate-pulse">SÃO_PAULO COORD: 23°S</span>
              </div>
              
              {/* Virtual SVG Map grids and pulses */}
              <div className="relative h-28 w-full">
                <svg viewBox="0 0 400 120" className="w-full h-full opacity-60">
                  {/* Continental paths */}
                  <path d="M50,30 L100,50 L110,90 L90,110 L50,80 Z" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <path d="M180,20 L240,40 L220,90 L160,70 Z" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <path d="M280,50 L340,30 L350,90 Z" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  
                  {/* Digital Line connections */}
                  <line x1="80" y1="40" x2="200" y2="45" stroke="rgba(0, 209, 255, 0.15)" strokeWidth="1" strokeDasharray="3,3" />
                  <line x1="200" y1="45" x2="310" y2="60" stroke="rgba(123, 46, 255, 0.15)" strokeWidth="1" />
                  <line x1="80" y1="40" x2="110" y2="90" stroke="rgba(0, 255, 157, 0.2)" strokeWidth="1.5" />

                  {/* Neon node points blinking */}
                  {/* Node 1: North America */}
                  <circle cx="80" cy="40" r="3" className="fill-neon-blue" />
                  <circle cx="80" cy="40" r="7" className="fill-transparent stroke-neon-blue/35 stroke-1 animate-ping" />

                  {/* Node 2: São Paulo Center */}
                  <circle cx="110" cy="90" r="3" className="fill-neon-green" />
                  <circle cx="110" cy="90" r="9" className="fill-transparent stroke-neon-green/35 stroke-1 animate-ping" />

                  {/* Node 3: Europe */}
                  <circle cx="200" cy="45" r="3" className="fill-neon-purple animate-pulse" />

                  {/* Node 4: Asia */}
                  <circle cx="310" cy="60" r="3" className="fill-neon-blue" />
                </svg>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: CYBER FORM CONTROLS PANEL */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-gray-850 shadow-2xl relative overflow-hidden h-full flex flex-col justify-between">
              
              <AnimatePresence mode="wait">
                {txState === 'idle' && (
                  /* THE FORM */
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                      
                      {/* Name field */}
                      <div className="flex-1 text-left">
                        <label htmlFor="name" className="block font-mono text-[9px] text-gray-400 uppercase mb-1.5 tracking-wider font-bold">
                          Nome Completo *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Ex: Carlos Albuquerque"
                            className="w-full bg-black-deep border border-gray-800 focus:border-neon-blue rounded px-4 py-3 font-sans text-xs text-white focus:outline-none transition-all placeholder:text-gray-600 focus:shadow-[0_0_10px_rgba(0,209,255,0.1)]"
                          />
                        </div>
                      </div>

                      {/* Email field */}
                      <div className="flex-1 text-left">
                        <label htmlFor="email" className="block font-mono text-[9px] text-gray-400 uppercase mb-1.5 tracking-wider font-bold">
                          Endereço de E-mail *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="carlos@empresa.com"
                          className="w-full bg-black-deep border border-gray-800 focus:border-neon-blue rounded px-4 py-3 font-sans text-xs text-white focus:outline-none transition-all placeholder:text-gray-600 focus:shadow-[0_0_10px_rgba(0,209,255,0.1)]"
                        />
                      </div>
                    </div>

                    {/* Company field */}
                    <div className="text-left">
                      <label htmlFor="company" className="block font-mono text-[9px] text-gray-400 uppercase mb-1.5 tracking-wider font-bold">
                        Organização / Empresa
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Ex: Empresa de Inovação S.A."
                        className="w-full bg-black-deep border border-gray-800 focus:border-neon-blue rounded px-4 py-3 font-sans text-xs text-white focus:outline-none transition-all placeholder:text-gray-600 focus:shadow-[0_0_10px_rgba(0,209,255,0.1)]"
                      />
                    </div>

                    {/* Message field */}
                    <div className="text-left">
                      <label htmlFor="message" className="block font-mono text-[9px] text-gray-400 uppercase mb-1.5 tracking-wider font-bold">
                        Como podemos ajudá-lo? (Escopo Técnico) *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={5}
                        placeholder="Descreva suscintamente suas principais preocupações cibernéticas (Ex: pentests periódicos, governança de LGPD ou SOC terceirizado)..."
                        className="w-full bg-black-deep border border-gray-800 focus:border-neon-blue rounded px-4 py-3 font-sans text-xs text-white focus:outline-none transition-all placeholder:text-gray-600 focus:shadow-[0_0_10px_rgba(0,209,255,0.1)] resize-none"
                      />
                    </div>

                    {/* Submit CTA button */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        className="w-full relative py-4.5 bg-gradient-to-r from-neon-blue to-neon-purple text-black-deep text-xs font-black tracking-widest uppercase rounded shadow-lg hover:shadow-[0_0_15px_rgba(0,209,255,0.45)] transition-all select-none group cursor-pointer"
                      >
                        <span className="flex items-center justify-center space-x-2">
                          <span>Transmitir Consulta Encriptada</span>
                          <LucideIcon name="send" className="w-3.5 h-3.5 text-black-deep group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </button>
                    </div>

                    <div className="text-center">
                      <span className="font-mono text-[7.5px] text-gray-500 block uppercase">
                        SUA CONEXÃO ESTÁ AUTOMATICAMENTE PROTEGIDA E CODIFICADA VIA AES-GCM 256.
                      </span>
                    </div>

                  </form>
                )}

                {txState === 'encrypting' && (
                  /* HIGH FIDELITY TRANSMISSION PROGRESS LOADER */
                  <motion.div
                    key="encrypting"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col justify-center items-stretch py-12"
                  >
                    <div className="text-center mb-6">
                      <div className="w-14 h-14 rounded-full border border-neon-blue flex items-center justify-center mx-auto text-neon-blue mb-4 animate-spin duration-3000">
                        <LucideIcon name="refresh" className="w-6 h-6" color="blue" />
                      </div>
                      <h4 className="font-display text-lg font-bold text-white uppercase tracking-wider">
                        Criptografando Canal...
                      </h4>
                      <p className="text-xs text-gray-400 mt-1 font-mono">
                        EMPACOTANDO CONTEÚDO EM CONVERT_TUNNEL
                      </p>
                    </div>

                    {/* Simulated terminal lines */}
                    <div className="bg-black-deep/90 p-5 rounded-lg border border-gray-900 font-mono text-[9px] leading-relaxed text-gray-300 text-left min-h-[160px] space-y-1 overflow-y-auto">
                      {txLogs.map((log, index) => (
                        <div key={index} className="flex space-x-2">
                          <span className="text-neon-blue font-bold">{'>'}</span>
                          <span>{log}</span>
                        </div>
                      ))}
                      <div className="flex space-x-1 text-neon-blue animate-pulse pt-2">
                        <span>{'>'}</span>
                        <span className="w-1.5 h-3.5 bg-neon-blue" />
                      </div>
                    </div>
                  </motion.div>
                )}

                {txState === 'sent' && (
                  /* SUCCESS FEEDBACK */
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col justify-center items-center py-12 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-neon-green/10 border-2 border-neon-green/60 text-neon-green flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(0,255,157,0.3)]">
                      <LucideIcon name="checkCircle" className="w-8 h-8" color="green" />
                    </div>
                    
                    <h4 className="font-display text-2xl font-black text-white uppercase tracking-tight">
                      Envio Confirmado!
                    </h4>
                    
                    <p className="font-mono text-[10px] text-neon-green uppercase font-bold tracking-widest mt-1.5">
                      GCM HASH_VERIFIED // SEC_TRANSMISSION: SUCCESS
                    </p>
                    
                    <p className="text-gray-300 font-sans text-xs sm:text-sm max-w-md mt-4 leading-relaxed">
                      Sua solicitação de auditoria técnica foi criptografada e salva com sucesso em nosso cofre central no SOC. Um arquiteto de segurança sênior analisará o escopo enviado e entrará em contato em até 4 horas.
                    </p>

                    <button
                      onClick={handleReset}
                      className="mt-8 px-6 py-2.5 border border-gray-700 hover:border-neon-blue text-xs font-bold text-gray-300 hover:text-white rounded select-none cursor-pointer"
                    >
                      Enviar Nova Mensagem
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
