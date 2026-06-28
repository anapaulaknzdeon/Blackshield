export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string; // Used to dynamic render Lucide icons
  badge?: string;
}

export interface TimelineStep {
  number: string;
  title: string;
  description: string;
  status: 'completed' | 'active' | 'pending';
}

export interface Technology {
  name: string;
  type: string;
  iconName: string;
}

export interface Certification {
  name: string;
  issuer: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  avatarUrl: string;
  result: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  category: 'Threat Intel' | 'Cloud Security' | 'AI & Sec' | 'Compliance' | 'Phishing';
  date: string;
  readTime: string;
  imageUrl: string;
  tags: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface StatItem {
  value: string;
  label: string;
  color: 'azure' | 'purple' | 'green';
  description: string;
}

export interface ThreatEvent {
  id: string;
  timestamp: string;
  ip: string;
  country: string;
  type: 'DDoS Attack' | 'SQL Injection' | 'Phishing Attempt' | 'Malware Execution' | 'Port Scan';
  target: string;
  status: 'BLOCKED' | 'MITIGATED' | 'ISOLATED';
  risk: 'CRITICAL' | 'HIGH' | 'MEDIUM';
}
