import React from 'react';
import {
  Shield,
  Terminal,
  Activity,
  Cloud,
  FileCheck,
  AlertTriangle,
  Scale,
  Cpu,
  HardDrive,
  Compass,
  Search,
  Eye,
  BarChart3,
  Lock,
  Users,
  Calendar,
  Server,
  Zap,
  Award,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Newspaper,
  Mail,
  Building,
  User,
  CheckCircle2,
  LockKeyhole,
  FileText,
  Clock,
  ExternalLink,
  ShieldCheck,
  Menu,
  X,
  Send,
  Phone,
  MapPin,
  Globe,
  Database,
  RefreshCw,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  shield: Shield,
  terminal: Terminal,
  activity: Activity,
  cloud: Cloud,
  fileCheck: FileCheck,
  alertTriangle: AlertTriangle,
  scale: Scale,
  cpu: Cpu,
  hardDrive: HardDrive,
  compass: Compass,
  search: Search,
  eye: Eye,
  barChart: BarChart3,
  lock: Lock,
  users: Users,
  calendar: Calendar,
  server: Server,
  zap: Zap,
  award: Award,
  arrowRight: ArrowRight,
  chevronDown: ChevronDown,
  chevronUp: ChevronUp,
  messageSquare: MessageSquare,
  newspaper: Newspaper,
  mail: Mail,
  building: Building,
  user: User,
  checkCircle: CheckCircle2,
  lockKeyhole: LockKeyhole,
  fileText: FileText,
  clock: Clock,
  externalLink: ExternalLink,
  shieldCheck: ShieldCheck,
  menu: Menu,
  x: X,
  send: Send,
  phone: Phone,
  mapPin: MapPin,
  globe: Globe,
  database: Database,
  refresh: RefreshCw,
};

interface LucideIconProps {
  name: string;
  className?: string;
  color?: 'blue' | 'purple' | 'green' | 'gray' | 'default';
}

export function LucideIcon({ name, className = '', color = 'default' }: LucideIconProps) {
  const IconComponent = iconMap[name] || Shield;

  const colorClasses = {
    blue: 'text-neon-blue drop-shadow-[0_0_8px_rgba(0,209,255,0.5)]',
    purple: 'text-neon-purple drop-shadow-[0_0_8px_rgba(123,46,255,0.5)]',
    green: 'text-neon-green drop-shadow-[0_0_8px_rgba(0,255,157,0.5)]',
    gray: 'text-gray-400',
    default: '',
  };

  return <IconComponent className={`${className} ${colorClasses[color]}`} />;
}
