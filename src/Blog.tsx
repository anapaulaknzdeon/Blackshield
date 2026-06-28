import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LucideIcon } from './LucideIcon';
import { BlogPost } from './types';

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const blogPosts: BlogPost[] = [
    {
      id: 'post-1',
      title: 'IA na Segurança Digital: Como Agentes Autônomos Interceptam Exploits Zero-Day',
      excerpt: 'A inteligência artificial transformou as equipes de SOC. Saiba como algoritmos de machine learning detectam scripts maliciosos mutáveis antes que virem assinaturas formais de mercado.',
      category: 'AI & Sec',
      date: 'Maio 22, 2026',
      readTime: '6 min leitura',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop',
      tags: ['IA', 'Zero-Day', 'Machine Learning'],
      content: `O cenário de ameaças digitais evolui em velocidade alarmante. Antigamente, softwares antivírus baseavam-se puramente em assinaturas estáticas de arquivos maliciosos. Um malware novo (Zero-Day) passava despercebido até que um laboratório coletasse uma amostra e distribuísse um patch.

Hoje, a BlackShield utiliza redes heurísticas alimentadas por Deep Learning. Nossos modelos monitoram comportamentos de threads de execução de kernel em tempo real. Se um processo de rotina tentar subitamente escalonação de privilégio ou mapear portas laterais de forma assíncrona, a IA intervém em menos de 150 milissegundos.

**Principais Vetores de Prevenção:**
1. **Machine Learning Comportamental:** Varredura proativa de processos.
2. **Análise Baseada em Linguagem Natural:** Triagem automatizada de logs operacionais.
3. **Mapeamento de Padrões Suspeitos:** Correlação de conexões TCP de múltiplos nós para prever movimentos coordenados de botnets.`
    },
    {
      id: 'post-2',
      title: 'Mutações de Phishing em 2026: Bypass de Autenticação Multifator (MFA)',
      excerpt: 'Conheça as novas técnicas de phishing reverso de proxy assíncrono que conseguem capturar tokens de sessão JWT ativos e contornar autenticações SMS e app.',
      category: 'Phishing',
      date: 'Maio 18, 2026',
      readTime: '5 min leitura',
      imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop',
      tags: ['Phishing', 'MFA', 'OAuth'],
      content: `O Phishing tradicional evoluiu e o uso de proxies reversos man-in-the-middle (MitM) assustam corporações. Através de ferramentas automatizadas, atacantes criam portais falsos que não apenas intermediam o login oficial, mas escutam e sequestram os cookies de cookies de sessão estabelecidos e tokens JWT de autenticação secundária em tempo real.

Mesmo se o colaborador utilizar MFA por aplicativo ou token SMS, o atacante retransmite o desafio em tempo real para o site legítimo, adquire a autorização e clona o ambiente local de sessão.

**Como Proteger sua Empresa:**
- **Identidades FIDO2 / Chaves de Segurança Físicas:** Únicos mecanismos que amarram a credencial ao domínio exato do navegador.
- **Micro-segmentação e VPN SDP (Software-Defined Perimeter):** Bloqueio sistemático de acessos originados fora de conexões monitoradas pelo SOC.
- **Treinamento de Phishing Corporativo:** Campanhas simuladas contínuas para educar colaboradores sobre anomalias em URLs.`
    },
    {
      id: 'post-3',
      title: 'Vazamento de Dados em Nuvem: Erros de Configuração que Custam Bilhões',
      excerpt: 'O armazenamento mal configurado continua sendo o calcanhar de aquiles das empresas. Entenda como buckets S3 e acessos IAM abertos comprometem conformidades cruciais.',
      category: 'Cloud Security',
      date: 'Maio 15, 2026',
      readTime: '7 min leitura',
      imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=400&fit=crop',
      tags: ['Nuvem', 'AWS', 'Vazamentos', 'IAM'],
      content: `Estudos revelam que mais de 80% das exfiltrações de dados em ambientes AWS, Google Cloud e Azure não derivam de exploits complexos, mas sim de erros humanos básicos em configurações de políticas IAM e privilégios excessivos atribuídos de forma errônea.

Adversários escaneiam blocos inteiros de IP públicos atrás de buckets de armazenamento que possuem chaves legíveis abertas para grupos públicos (AllUsers). Uma vez dentro, basta usar ferramentas básicas de linha de comando para baixar gigabytes de registros de clientes corporativos.

**Planos de Mitigação Obrigatórios:**
- **CSPM (Cloud Security Posture Management):** Varreduras contínuas e corrigíveis contra desvios de configurações recomendadas (CIS Benchmarks).
- **Princípio de Menor Privilégio (PoLP):** Revogação de permissões administrativas por tempo indefinido das aplicações.
- **Backups Air-gapped e Criptografia Mandatada:** Garantir confidencialidade mesmo em caso de queda de políticas de acesso.`
    },
    {
      id: 'post-4',
      title: 'Proteção de Perímetro Empresarial pós-COVID: O Declínio das VPNs Tradicionais',
      excerpt: 'Por que depender de redes privadas virtuais legadas é perigoso em 2026? Saiba como a evolução para perímetros definidos por software (SDP) elimina a movimentação lateral de atacantes.',
      category: 'Compliance',
      date: 'Maio 10, 2026',
      readTime: '8 min leitura',
      imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop',
      tags: ['VPN', 'SDP', 'Zero Trust'],
      content: `As VPNs tradicionais funcionavam bem quando poucas pessoas trabalhavam de fora do escritório. Elas concedem acesso integral ao colaborador à rede interna após validação inicial. Em essência, o adversário que comprometer uma única VPN de consultor terá passe livre para escanear, pivotar e infestar o datacenter de AD (Active Directory).

A BlackShield recomenda mudar para a tecnologia SDP (Software Defined Perimeter), onde a rede é invisível. O usuário acessa exclusivamente aplicações individuais cadastradas e autorizadas ponto a ponto pelo controlador central.

**Vantagens do Perímetro SDP:**
- **Invisibilidade Total de Portas:** Dispositivos na internet pública não conseguem sequer pingar os servidores internos.
- **Mitigação de Lateralidade:** Sem propagação horizontal de ransomware.
- **Autenticação Continuada Contextual:** Validações de geolocalização e integridade do endpoint a cada requisição.`
    },
    {
      id: 'post-5',
      title: 'Os Novos Golpes Digitais de 2026: Deepfakes de Voz Aplicados ao C-Level',
      excerpt: 'Ataques que clonam vozes de executivos em tempo real por IA assustam times de tesouraria. Entenda como blindar seus canais de comunicação interna.',
      category: 'Threat Intel',
      date: 'Maio 05, 2026',
      readTime: '5 min leitura',
      imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop',
      tags: ['Deepfake', 'Golpes', 'Social Engineering'],
      content: `Golpes clássicos de engenharia social ganharam poder tático com inteligência artificial generativa de voz. Com apenas 10 segundos de áudio extraído de apresentações públicas ou podcasts, atacantes clonam com fidelidade absoluta vozes de CEOS e CFOs enviando ordens expressas via WhatsApp ou ligações telefônicas para aprovação de transferências financeiras críticas em regime de pressa.

Empresas de finanças brasileiras sofreram perdas imensas por essa tática, contornando procedimentos padrões de segurança.

**Políticas de Autenticação Necessárias:**
- **Código Coletivo Fora de Banda:** Protocolação de palavras de verificação randômicas offline para transferências de alto montante.
- **Duplo Canal de Aprovação Mandatária:** Impedir ordenamento monocrático via canais móveis externos.
- **Softwares Anti-deepfake de Borda:** Implementar sistemas de verificação de marca d'água sintética.`
    },
    {
      id: 'post-6',
      title: 'LGPD e Segurança de Dados em 2026: Multas e Sanções da ANPD mais Rígidas',
      excerpt: 'A Autoridade Nacional de Proteção de Dados (ANPD) aumentou a severidade de fiscalização contra vulnerabilidades óbvias de software. Saiba o que é exigido.',
      category: 'Compliance',
      date: 'Abril 28, 2026',
      readTime: '6 min leitura',
      imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&h=400&fit=crop',
      tags: ['LGPD', 'ANPD', 'Conformidade', 'Multas'],
      content: `A conformidade legal civil brasileira LGPD deixou de ser mera redação contratual para se tornar auditoria constante de integridade tecnológica. Recentemente, sanções pesadas foram emitidas não apenas contra grandes incidentes de vazamentos, mas contra a falta sistemática de planos adequados de Disaster Recovery e logs inalteráveis de acessos.

Se a sua empresa não souber monitorar e justificar a autoria de acessos a dados sensíveis, estará em infração grave perante investigações.

**Adequações Tecnológicas de LGPD:**
- **Segregações de Cookies & Anonymizer:** Criptografia automática de PII (Personally Identifiable Information).
- **Trilhas de Auditoria Imutáveis:** Logs protegidos por chaves WORM contra manipulação interna.
- **Processos de Divulgação de Incidentes de 72 horas:** Prontidão operada pelo encarregado de dados (DPO) assessorada pelo SOC.`
    }
  ];

  const categories = ['All', 'Threat Intel', 'Cloud Security', 'AI & Sec', 'Compliance', 'Phishing'];

  const filteredPosts = selectedCategory === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <section id="blog" className="relative py-24 bg-bg-cyber overflow-hidden border-t border-gray-900">
      <div className="absolute inset-0 cyber-grid opacity-10" />
      <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] bg-neon-blue/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase text-neon-blue tracking-widest font-bold">
            07 // PUBLICações DE INTELIGÊNCIA EM SEGURANÇA
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-3 tracking-tight">
            Blog de <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">Segurança</span> Ativa
          </h2>
          <p className="text-gray-400 mt-4 text-sm sm:text-base">
            Análises aprofundadas, alertas de inteligência de exploits ativos e boas práticas essenciais desenvolvidas do nosso laboratório global de pesquisa.
          </p>
        </div>

        {/* Categories Tab selectors */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`font-mono text-[10px] px-4 py-2 rounded-full border transition-all select-none cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-neon-blue text-black-deep font-bold border-neon-blue shadow-[0_0_10px_rgba(0,209,255,0.3)]'
                  : 'bg-black-deep/50 text-gray-400 border-gray-850 hover:text-white hover:border-gray-700'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* 6 Grid responsive posts lists */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="glass-panel rounded-2xl overflow-hidden border border-gray-800 hover:border-neon-blue/40 shadow-xl flex flex-col justify-between group h-full"
            >
              {/* Post image with referrer restriction and dynamic tech graphics overlay */}
              <div className="relative h-48 w-full overflow-hidden bg-black">
                <div className="absolute inset-0 bg-gradient-to-t from-bg-cyber to-transparent opacity-80 z-10" />
                <div className="absolute top-4 left-4 z-20 font-mono text-[9px] font-bold bg-neon-blue/15 border border-neon-blue/30 text-neon-blue px-2.5 py-0.5 rounded shadow">
                  {post.category.toUpperCase()}
                </div>
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                />
              </div>

              {/* Card Meta details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-3.5 font-mono text-[9px] text-gray-500 mb-3">
                    <span className="flex items-center space-x-1">
                      <LucideIcon name="calendar" className="w-3 h-3" />
                      <span>{post.date}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <LucideIcon name="clock" className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  {/* Post Title */}
                  <h3 className="font-display text-lg font-bold text-white group-hover:text-neon-blue transition-colors leading-snug">
                    {post.title}
                  </h3>

                  {/* Post excerpt */}
                  <p className="text-gray-400 font-sans text-xs mt-3 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Post Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[7.5px] bg-slate-900 border border-gray-850 px-2 py-0.5 rounded text-gray-500 group-hover:text-gray-400"
                      >
                        #{tag.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Read more button trigger */}
                <div className="mt-6 pt-4 border-t border-gray-900/80">
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="font-display text-xs font-bold text-neon-blue hover:text-white transition-colors flex items-center space-x-1 uppercase select-none cursor-pointer"
                  >
                    <span>Ler Artigo Completo</span>
                    <LucideIcon name="arrowRight" className="w-3.5 h-3.5" color="blue" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* FULL ARTICLE EXPANSION SIMULATION DRAWER */}
        <AnimatePresence>
          {selectedPost && (
            <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/80 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="w-full max-w-2xl h-full bg-bg-cyber border-l border-neon-blue/30 shadow-2xl flex flex-col justify-between overflow-hidden"
              >
                
                {/* Drawer header */}
                <div className="border-b border-gray-850 bg-black-deep/80 px-6 py-5 flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <span className="font-mono text-[10px] bg-neon-blue/10 border border-neon-blue/30 text-neon-blue px-2.5 py-0.5 rounded font-bold">
                      {selectedPost.category.toUpperCase()}
                    </span>
                    <span className="font-mono text-[9px] text-gray-500 uppercase">
                      SEC_INTEL_REPORT // MAINFRAME_DATA
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="p-1.5 rounded-md hover:bg-white/5 text-gray-400 hover:text-white transition-colors focus:outline-none"
                    aria-label="Close article"
                  >
                    <LucideIcon name="x" className="w-5.5 h-5.5 text-gray-300" />
                  </button>
                </div>

                {/* Drawer scroll content body */}
                <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-6">
                  
                  {/* Banner */}
                  <div className="h-56 w-full rounded-xl overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-cyber via-transparent to-transparent z-10" />
                    <img
                      src={selectedPost.imageUrl}
                      alt={selectedPost.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover opacity-70"
                    />
                  </div>

                  {/* Publication metadata */}
                  <div className="flex items-center space-x-4 font-mono text-[9.5px] text-gray-500">
                    <span className="flex items-center space-x-1">
                      <LucideIcon name="calendar" className="w-3.5 h-3.5" />
                      <span>{selectedPost.date}</span>
                    </span>
                    <span>|</span>
                    <span className="flex items-center space-x-1">
                      <LucideIcon name="clock" className="w-3.5 h-3.5" />
                      <span>{selectedPost.readTime}</span>
                    </span>
                    <span>|</span>
                    <span className="text-neon-blue">AUTOR: TEAM_BLACKSHIELD</span>
                  </div>

                  {/* Title */}
                  <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                    {selectedPost.title}
                  </h1>

                  {/* Body Paragraph content formatted */}
                  <div className="text-gray-300 font-sans text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line border-t border-gray-900 pt-6">
                    {selectedPost.content}
                  </div>

                  {/* Tags cluster */}
                  <div className="flex flex-wrap gap-2 pt-6 border-t border-gray-900">
                    {selectedPost.tags.map((t) => (
                      <span key={t} className="font-mono text-[8.5px] bg-black-deep border border-gray-850 text-neon-blue px-3 py-1 rounded">
                        #{t.toUpperCase()}
                      </span>
                    ))}
                  </div>

                </div>

                {/* Drawer footer close logic */}
                <div className="bg-black-deep/80 border-t border-gray-850 px-6 py-4 flex justify-between items-center">
                  <span className="font-mono text-[8.5px] text-gray-500">
                    STATUS: REVISION_COMPLETE
                  </span>
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="px-5 py-2 w-full sm:w-auto text-center bg-neon-blue hover:bg-neon-purple text-black-deep text-xs font-bold uppercase rounded select-none cursor-pointer"
                  >
                    Fechar Relatório
                  </button>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
