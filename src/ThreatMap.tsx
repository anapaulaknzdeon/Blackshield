import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Terminal, 
  Globe, 
  Server, 
  X, 
  RefreshCw, 
  Cpu
} from 'lucide-react';

// Interfaces
interface ThreatEvent {
  id: string;
  timestamp: string;
  type: 'DDoS' | 'SQL Injection' | 'Ransomware' | 'Phishing' | 'Botnet' | 'Intrusion';
  origin: string;
  originCountry: string;
  originCoords: { lon: number; lat: number };
  target: string;
  targetCoords: { lon: number; lat: number };
  severity: 'CRÍTICA' | 'ALTA' | 'MÉDIA' | 'BAIXA';
  payloadSize: string;
  status: 'MITIGADO' | 'ISOLADO' | 'RECHASSADO' | 'BLOQUEADO';
  isCustom?: boolean;
}

interface CommandHub {
  name: string;
  code: string;
  lon: number;
  lat: number;
  ip: string;
  ping: number;
  shieldStrength: number;
  trafficLoad: number; // %
  status: 'ESTÁVEL' | 'DEFENDENDO' | 'FILTRANDO';
}

export default function ThreatMap() {
  // Core Operational States
  const [activeFilter, setActiveFilter] = useState<string>('TODOS');
  
  // Simulation and Display states
  const [events, setEvents] = useState<ThreatEvent[]>([]);
  const [activeAttacks, setActiveAttacks] = useState<ThreatEvent[]>([]);
  const [selectedHub, setSelectedHub] = useState<CommandHub | null>(null);
  const [hoveredHub, setHoveredHub] = useState<string | null>(null);
  
  // Interactive control toggles
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [simulationSpeed, setSimulationSpeed] = useState<number>(2000); // ms
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [viewAngle, setViewAngle] = useState<{ tilt: number; rotation: number }>({ tilt: 18, rotation: 120 });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDragging = useRef<boolean>(false);
  const previousMousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Core Tactical Security Hubs (Cleanly positioned globally)
  const commandHubs: CommandHub[] = [
    { name: 'São Paulo (SP_CORE_01)', code: 'SP-BR', lon: -46.63, lat: -23.55, ip: '189.50.112.4', ping: 12, shieldStrength: 100, trafficLoad: 28, status: 'ESTÁVEL' },
    { name: 'Nova York (NY_EDGE_03)', code: 'NY-US', lon: -74.00, lat: 40.71, ip: '192.16.241.80', ping: 38, shieldStrength: 98, trafficLoad: 41, status: 'ESTÁVEL' },
    { name: 'Londres (LDN_PROXY_02)', code: 'LDN-UK', lon: -0.12, lat: 51.50, ip: '82.165.4.15', ping: 64, shieldStrength: 100, trafficLoad: 35, status: 'ESTÁVEL' },
    { name: 'Frankfurt (FRA_IPS_09)', code: 'FRA-DE', lon: 8.68, lat: 50.11, ip: '46.137.92.100', ping: 72, shieldStrength: 95, trafficLoad: 52, status: 'ESTÁVEL' },
    { name: 'Cingapura (SGP_HUB_12)', code: 'SGP-SG', lon: 103.85, lat: 1.35, ip: '13.228.0.45', ping: 115, shieldStrength: 100, trafficLoad: 31, status: 'ESTÁVEL' },
    { name: 'Tóquio (TKY_PROXY_05)', code: 'TKY-JP', lon: 139.69, lat: 35.67, ip: '210.140.10.2', ping: 138, shieldStrength: 99, trafficLoad: 45, status: 'ESTÁVEL' },
    { name: 'Sydney (SYD_WALL_06)', code: 'SYD-AU', lon: 151.20, lat: -33.86, ip: '54.252.0.1', ping: 182, shieldStrength: 100, trafficLoad: 19, status: 'ESTÁVEL' },
  ];

  // Threat origins representing realistic cyber hot zones
  const attackOrigins = [
    { country: 'Rússia', name: 'Moscou Reflector', lon: 37.61, lat: 55.75 },
    { country: 'China', name: 'Beijing Botnet Center', lon: 116.40, lat: 39.90 },
    { country: 'Ucrânia', name: 'Kiev Proxy Node', lon: 30.52, lat: 50.45 },
    { country: 'Coreia do Norte', name: 'Pyongyang Cyber Outpost', lon: 125.76, lat: 39.03 },
    { country: 'EUA', name: 'Los Angeles Zombie Farm', lon: -118.24, lat: 34.05 },
    { country: 'Brasil', name: 'Manaus VPN Node', lon: -60.02, lat: -3.11 },
    { country: 'Holanda', name: 'Amsterdam Server Cluster', lon: 4.89, lat: 52.37 },
    { country: 'Cingapura', name: 'SGP Residential Bot', lon: 104.0, lat: 1.2 },
    { country: 'África do Sul', name: 'Cape Town Zombie Node', lon: 18.42, lat: -33.92 },
    { country: 'Índia', name: 'Mumbai Hijacked Gateway', lon: 72.87, lat: 19.07 }
  ];

  const attackTypesConfig = [
    { type: 'DDoS' as const, severity: 'CRÍTICA' as const, color: '#FF0055', payload: '68.4 Gbps UDP Flood' },
    { type: 'SQL Injection' as const, severity: 'MÉDIA' as const, color: '#FFB100', payload: 'Blind injection on Port 443' },
    { type: 'Ransomware' as const, severity: 'CRÍTICA' as const, color: '#FF0055', payload: 'BlackByte Payload Execute' },
    { type: 'Phishing' as const, severity: 'BAIXA' as const, color: '#00E575', payload: 'Fake Exchange OAuth Portal' },
    { type: 'Botnet' as const, severity: 'ALTA' as const, color: '#FFB100', payload: 'Mirai Variant Propagation' },
    { type: 'Intrusion' as const, severity: 'CRÍTICA' as const, color: '#FF0055', payload: 'Citrix RCE attempt' },
  ];

  // Helper: computationally robust geographic land detection function representing realistic continents
  const isLand = (lon: number, lat: number): boolean => {
    // Greenland
    if (lon > -75 && lon < -15 && lat > 60 && lat < 85) return true;
    
    // North America
    if (lon > -168 && lon < -52 && lat > 15 && lat < 72) {
      if (lon > -100 && lat < 30 && lat > 15 && lon < -80) return true; // Central America / Mexico
      if (lat >= 30) return true;
    }
    
    // South America
    if (lon > -82 && lon < -34 && lat > -56 && lat < 13) {
      if (lat < -20) {
        const width = (lat + 56) / 36;
        const centerLon = -65;
        return Math.abs(lon - centerLon) < width * 20;
      }
      return true;
    }
    
    // Africa
    if (lon > -20 && lon < 52 && lat > -35 && lat < 37) {
      if (lat > 10) {
        return lon > -18 && lon < 35;
      }
      const width = (lat + 35) / 45;
      const centerLon = 20;
      return Math.abs(lon - centerLon) < width * 25 + 5;
    }
    
    // Eurasia (Europe/Asia combined)
    if (lon > -10 && lon < 180 && lat > 10 && lat < 78) {
      if (lat < 23 && lon > 98) return true; // Southeast Asia
      if (lat < 23 && lon < 98) {
        if (lon > 35 && lon < 60 && lat > 12) return true; // Arabia
        if (lon > 68 && lon < 90 && lat > 8) return true; // India
        return false;
      }
      return true;
    }
    
    // Australia
    if (lon > 113 && lon < 154 && lat > -44 && lat < -10) return true;
    
    // United Kingdom & Ireland
    if (lon > -11 && lon < 2 && lat > 50 && lat < 61) return true;
    
    // Japan
    if (lon > 130 && lon < 146 && lat > 30 && lat < 46) return true;

    // Madagascar
    if (lon > 43 && lon < 51 && lat > -26 && lat < -12) return true;
    
    return false;
  };

  // Generate responsive continental coordinates points constellation
  const globeDotConstellation = useMemo(() => {
    const points = [];
    // Spacing chosen to achieve a dense yet fluid dot grid (around 750 points)
    for (let lat = -55; lat <= 75; lat += 3.5) {
      const cosLat = Math.cos((lat * Math.PI) / 180);
      const lonStep = 6.0 / (cosLat + 0.15); // Adjust horizontal density near poles
      for (let lon = -180; lon <= 180; lon += lonStep) {
        if (isLand(lon, lat)) {
          points.push({ lon, lat });
        }
      }
    }
    return points;
  }, []);

  // Launch a new cyber attack simulation event
  const injectAttackEvent = (customOrigin?: { lon: number; lat: number; name: string; country: string }) => {
    // Determine source
    let originName = '';
    let originCountry = '';
    let originCoords = { lon: 0, lat: 0 };

    if (customOrigin) {
      originName = customOrigin.name;
      originCountry = customOrigin.country;
      originCoords = { lon: customOrigin.lon, lat: customOrigin.lat };
    } else {
      const o = attackOrigins[Math.floor(Math.random() * attackOrigins.length)];
      originName = o.name;
      originCountry = o.country;
      originCoords = { lon: o.lon, lat: o.lat };
    }

    // Determine target (nearest to customized source or select randomly)
    let targetHub = commandHubs[Math.floor(Math.random() * commandHubs.length)];
    if (customOrigin) {
      let minDist = Infinity;
      commandHubs.forEach(hub => {
        const d = Math.hypot(hub.lon - originCoords.lon, hub.lat - originCoords.lat);
        if (d < minDist) {
          minDist = d;
          targetHub = hub;
        }
      });
    }

    const typeConfig = attackTypesConfig[Math.floor(Math.random() * attackTypesConfig.length)];
    const id = `INT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const timestamp = new Date().toLocaleTimeString('pt-BR', { hour12: false });
    const statuses: Array<'MITIGADO' | 'ISOLADO' | 'RECHASSADO' | 'BLOQUEADO'> = ['MITIGADO', 'RECHASSADO', 'ISOLADO', 'BLOQUEADO'];

    const newAttack: ThreatEvent = {
      id,
      timestamp,
      type: typeConfig.type,
      origin: originName,
      originCountry,
      originCoords,
      target: targetHub.name,
      targetCoords: { lon: targetHub.lon, lat: targetHub.lat },
      severity: typeConfig.severity,
      payloadSize: typeConfig.payload,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      isCustom: !!customOrigin
    };

    // Add to state
    setActiveAttacks(prev => [...prev, newAttack]);
    setEvents(prev => [newAttack, ...prev].slice(0, 40));

    // Cleanup active travel visualization arc after travel timeline finishes (1.8s)
    setTimeout(() => {
      setActiveAttacks(prev => prev.filter(att => att.id !== id));
    }, 1800);
  };

  // Main Loop logic for dynamic attacks stream
  useEffect(() => {
    if (!isSimulating) return;

    // Seed logs instantly
    if (events.length === 0) {
      for (let i = 0; i < 5; i++) {
        setTimeout(() => injectAttackEvent(), i * 300);
      }
    }

    const timer = setInterval(() => {
      injectAttackEvent();
    }, simulationSpeed);

    return () => clearInterval(timer);
  }, [isSimulating, simulationSpeed, events.length]);

  // Auto rotational drive loop
  useEffect(() => {
    if (!autoRotate || isDragging.current) return;
    
    let lastFrame = requestAnimationFrame(rotateClock);
    function rotateClock() {
      setViewAngle(prev => ({
        ...prev,
        rotation: (prev.rotation + 0.16) % 360
      }));
      lastFrame = requestAnimationFrame(rotateClock);
    }
    
    return () => cancelAnimationFrame(lastFrame);
  }, [autoRotate]);

  // Project Spherical Longitude/Latitude 3D Coordinates onto orthographic 2D Screen Canvas
  const projectCoordinates = (lon: number, lat: number, rotAngle: number, tiltAngle: number, radius: number, width: number, height: number) => {
    const radLon = (lon * Math.PI) / 180;
    const radLat = (lat * Math.PI) / 180;
    const radRot = (rotAngle * Math.PI) / 180;
    const radTilt = (tiltAngle * Math.PI) / 180;

    const adjustedLon = radLon + radRot;

    // 3D Matrix Trigonometric Spherical Equations (orthographic projection)
    const x = Math.cos(radLat) * Math.sin(adjustedLon);
    const y = Math.sin(radLat) * Math.cos(radTilt) - Math.cos(radLat) * Math.cos(adjustedLon) * Math.sin(radTilt);
    const z = Math.sin(radLat) * Math.sin(radTilt) + Math.cos(radLat) * Math.cos(adjustedLon) * Math.cos(radTilt);

    const screenX = width / 2 + x * radius;
    const screenY = height / 2 - y * radius;

    return { x: screenX, y: screenY, z, visible: z > 0 };
  };

  // 3D Canvas Rendering Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    
    // Track sizing
    const renderGlobe = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      const width = rect.width;
      const height = rect.height;
      
      // Clear Canvas
      ctx.clearRect(0, 0, width, height);

      // Sphere specifications
      const radius = Math.min(width, height) * 0.42;
      const cx = width / 2;
      const cy = height / 2;

      // 1. Atmosphere Core Glowing Backdrops
      ctx.save();
      const atmosphereGrad = ctx.createRadialGradient(cx, cy, radius * 0.95, cx, cy, radius * 1.08);
      atmosphereGrad.addColorStop(0, 'rgba(0, 186, 255, 0.08)');
      atmosphereGrad.addColorStop(0.5, 'rgba(0, 100, 255, 0.04)');
      atmosphereGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = atmosphereGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.15, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Subtle Outer Rim Boundary
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 186, 255, 0.18)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // 2. Render Grid Layer (Meridians & Parallels) if enabled
      if (showGrid) {
        ctx.save();
        ctx.lineWidth = 0.5;
        // Parallels (Latitudes)
        [-45, -20, 0, 20, 45, 65].forEach(lat => {
          ctx.beginPath();
          let prevPoint: { x: number; y: number; z: number } | null = null;
          
          for (let lon = -180; lon <= 180; lon += 5) {
            const pt = projectCoordinates(lon, lat, viewAngle.rotation, viewAngle.tilt, radius, width, height);
            
            // Draw segment
            if (prevPoint && pt.z > -0.1) {
              ctx.strokeStyle = pt.z > 0 ? 'rgba(0, 186, 255, 0.12)' : 'rgba(0, 100, 255, 0.03)';
              ctx.beginPath();
              ctx.moveTo(prevPoint.x, prevPoint.y);
              ctx.lineTo(pt.x, pt.y);
              ctx.stroke();
            }
            prevPoint = pt;
          }
        });

        // Meridians (Longitudes)
        [-120, -60, 0, 60, 120, 180].forEach(lon => {
          ctx.beginPath();
          let prevPoint: { x: number; y: number; z: number } | null = null;
          
          for (let lat = -80; lat <= 80; lat += 5) {
            const pt = projectCoordinates(lon, lat, viewAngle.rotation, viewAngle.tilt, radius, width, height);
            
            if (prevPoint && pt.z > -0.1) {
              ctx.strokeStyle = pt.z > 0 ? 'rgba(0, 186, 255, 0.12)' : 'rgba(0, 100, 255, 0.03)';
              ctx.beginPath();
              ctx.moveTo(prevPoint.x, prevPoint.y);
              ctx.lineTo(pt.x, pt.y);
              ctx.stroke();
            }
            prevPoint = pt;
          }
        });
        ctx.restore();
      }

      // 3. Render Land Dot Constellations (Translucent Holographic look)
      globeDotConstellation.forEach(dot => {
        const pt = projectCoordinates(dot.lon, dot.lat, viewAngle.rotation, viewAngle.tilt, radius, width, height);
        
        ctx.beginPath();
        // Dynamic color representing depth on the 3D globe coordinate axis
        if (pt.visible) {
          ctx.fillStyle = `rgba(0, 186, 255, ${0.4 + pt.z * 0.4})`;
          ctx.arc(pt.x, pt.y, 1.2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Back hemisphere render with low opacity
          ctx.fillStyle = `rgba(0, 75, 140, ${0.08 + (pt.z + 1) * 0.04})`;
          ctx.arc(pt.x, pt.y, 0.8, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 4. Render Tactical Attack Curves (Real-time Parabolas)
      activeAttacks.forEach(att => {
        const start = projectCoordinates(att.originCoords.lon, att.originCoords.lat, viewAngle.rotation, viewAngle.tilt, radius, width, height);
        const end = projectCoordinates(att.targetCoords.lon, att.targetCoords.lat, viewAngle.rotation, viewAngle.tilt, radius, width, height);

        // Only render vectors if at least one endpoint is relative to our viewing angle
        if (start.z < -0.3 && end.z < -0.3) return;

        // Custom severity trace attributes
        const color = att.severity === 'CRÍTICA' ? '#FF0055' : att.severity === 'ALTA' ? '#FF5100' : att.severity === 'MÉDIA' ? '#FFB100' : '#00E575';
        
        // Render 3D parabolic trajectory mathematically arcs
        const steps = 30;
        ctx.save();
        ctx.lineWidth = 1.0;
        ctx.strokeStyle = `${color}25`; // translucent tracer line

        ctx.beginPath();
        let prevPoint: { x: number; y: number } | null = null;
        let animatedBulletPos: { x: number; y: number; z: number } | null = null;
        
        // Progress percentage indicator to draw the laser travel bullet
        const streamProgress = (Date.now() % 1800) / 1800;

        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          
          // Interpolate source & destination unit-sphere vector direction
          const latInterp = att.originCoords.lat + (att.targetCoords.lat - att.originCoords.lat) * t;
          const lonInterp = att.originCoords.lon + (att.targetCoords.lon - att.originCoords.lon) * t;

          // Parabolic height scale factors for altitude
          const heightFactor = 0.22 * Math.sin(Math.PI * t);
          const currentRadius = radius * (1 + heightFactor);

          const pt = projectCoordinates(lonInterp, latInterp, viewAngle.rotation, viewAngle.tilt, currentRadius, width, height);

          // Plot line segments
          if (prevPoint) {
            ctx.lineTo(pt.x, pt.y);
          } else {
            ctx.moveTo(pt.x, pt.y);
          }
          prevPoint = pt;

          // Store exact coordinate for the animated laser bullet
          if (Math.abs(t - streamProgress) < 1.0 / steps) {
            animatedBulletPos = pt;
          }
        }
        ctx.stroke();

        // Draw traveling laser photon
        if (animatedBulletPos && animatedBulletPos.z > -0.2) {
          ctx.beginPath();
          const pGlow = ctx.createRadialGradient(animatedBulletPos.x, animatedBulletPos.y, 0, animatedBulletPos.x, animatedBulletPos.y, 6);
          pGlow.addColorStop(0, '#FFFFFF');
          pGlow.addColorStop(0.3, color);
          pGlow.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = pGlow;
          ctx.arc(animatedBulletPos.x, animatedBulletPos.y, 6, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      // 5. Render Shield Nodes (Defense Hubs)
      commandHubs.forEach(hub => {
        const pt = projectCoordinates(hub.lon, hub.lat, viewAngle.rotation, viewAngle.tilt, radius, width, height);
        
        if (pt.z <= 0) return; // Hidden behind the globe

        const isHovered = hoveredHub === hub.name || selectedHub?.name === hub.name;
        const activeAttCount = activeAttacks.filter(a => a.target === hub.name).length;
        const color = activeAttCount > 0 ? '#FF0055' : '#00E575';

        ctx.save();
        
        // Interactive outer pulsing indicator
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, isHovered ? 8 : 4.5, 0, Math.PI * 2);
        ctx.fillStyle = isHovered ? `${color}40` : `${color}25`;
        ctx.fill();
        
        // Solid center core beacon dot
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        // Pulsate outer scanning ring when under active attack mitigations
        if (activeAttCount > 0 || isHovered) {
          const pulseR = 5 + (Date.now() % 800) / 75;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, pulseR, 0, Math.PI * 2);
          ctx.strokeStyle = color;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }

        // Labels
        ctx.font = 'bold 9px monospace';
        ctx.fillStyle = isHovered ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)';
        ctx.fillText(hub.code, pt.x + 8, pt.y + 3);

        ctx.restore();
      });

      animFrame = requestAnimationFrame(renderGlobe);
    };

    renderGlobe();
    return () => cancelAnimationFrame(animFrame);
  }, [viewAngle, activeAttacks, hoveredHub, selectedHub, showGrid]);

  // Interactivity: Drag to Rotate globe math orchestration
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDragging.current = true;
    previousMousePosition.current = {
      x: e.clientX,
      y: e.clientY
    };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging.current) {
      // Find hovered hub under cursor
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const radius = Math.min(rect.width, rect.height) * 0.42;

      let found: string | null = null;
      for (const hub of commandHubs) {
        const pt = projectCoordinates(hub.lon, hub.lat, viewAngle.rotation, viewAngle.tilt, radius, rect.width, rect.height);
        if (pt.z > 0 && Math.hypot(pt.x - x, pt.y - y) < 14) {
          found = hub.name;
          break;
        }
      }
      setHoveredHub(found);
      return;
    }

    const deltaX = e.clientX - previousMousePosition.current.x;
    const deltaY = e.clientY - previousMousePosition.current.y;

    setViewAngle(prev => {
      let nextTilt = prev.tilt - deltaY * 0.35;
      // Anchor boundary rules to prevent flipping the axis upside down
      nextTilt = Math.max(-55, Math.min(55, nextTilt));
      return {
        rotation: (prev.rotation + deltaX * 0.35 + 360) % 360,
        tilt: nextTilt
      };
    });

    previousMousePosition.current = {
      x: e.clientX,
      y: e.clientY
    };
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDragging.current = false;
    
    // Check if clicked over a defense hub
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const radius = Math.min(rect.width, rect.height) * 0.42;

    let clickedHub: CommandHub | null = null;
    for (const hub of commandHubs) {
      const pt = projectCoordinates(hub.lon, hub.lat, viewAngle.rotation, viewAngle.tilt, radius, rect.width, rect.height);
      if (pt.z > 0 && Math.hypot(pt.x - x, pt.y - y) < 15) {
        clickedHub = hub;
        break;
      }
    }

    if (clickedHub) {
      setSelectedHub(clickedHub);
    } else {
      // If clicked empty area of sphere, shoot customized vector
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const dx = (x - cx) / radius;
      const dy = -(y - cy) / radius;

      // Ensure clicked area inside the physical sphere boundary
      if (Math.hypot(dx, dy) <= 1.0) {
        // Reverse-project click back to mathematical spherical coordinates
        const z = Math.sqrt(1 - dx * dx - dy * dy);
        const radTilt = (viewAngle.tilt * Math.PI) / 180;
        const radRot = (viewAngle.rotation * Math.PI) / 180;

        // Orthographic inverse equations
        const yRotated = dy * Math.cos(radTilt) + z * Math.sin(radTilt);
        const zRotated = -dy * Math.sin(radTilt) + z * Math.cos(radTilt);
        const xRotated = dx;

        const revLat = Math.asin(yRotated) * (180 / Math.PI);
        const revLon = (Math.atan2(xRotated, zRotated) - radRot) * (180 / Math.PI);

        // Normalize degrees range
        let normLon = revLon % 360;
        if (normLon < -180) normLon += 360;
        if (normLon > 180) normLon -= 360;

        injectAttackEvent({
          lon: normLon,
          lat: revLat,
          name: `Nó Tático [lon:${normLon.toFixed(0)}°, lat:${revLat.toFixed(0)}°]`,
          country: 'Invasor Externo'
        });
      }
    }
  };

  // Live filtered event feed selector
  const filteredEvents = useMemo(() => {
    if (activeFilter === 'TODOS') return events;
    return events.filter(e => e.type.toUpperCase() === activeFilter.toUpperCase());
  }, [events, activeFilter]);

  // Compute percentage calculations for graphs
  const typePercentages = useMemo(() => {
    const counts: Record<string, number> = {};
    events.forEach(e => counts[e.type] = (counts[e.type] || 0) + 1);
    const total = events.length || 1;
    return Object.entries(counts).map(([name, count]) => ({
      name,
      percentage: Math.round((count / total) * 100),
      count
    })).sort((a, b) => b.count - a.count);
  }, [events]);

  const topOriginStatistics = useMemo(() => {
    const counts: Record<string, number> = {};
    events.forEach(e => counts[e.originCountry] = (counts[e.originCountry] || 0) + 1);
    return Object.entries(counts)
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 4);
  }, [events]);

  return (
    <section 
      id="live-threat-tactical" 
      className="relative bg-bg-cyber text-white py-24 px-4 sm:px-6 lg:px-8 border-t border-b border-gray-900 overflow-hidden"
    >
      {/* Cmd Center Scanlines and grid details */}
      <div className="absolute inset-0 bg-[#02050a]/40 bg-scanline pointer-events-none z-10 opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,186,255,0.03),transparent_70%)] pointer-events-none" />

      {/* Cyber Grid pattern */}
      <div className="absolute inset-0 cyber-grid opacity-[0.06] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-20 flex flex-col space-y-12">
        
        {/* HEADER BLOCK */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-gray-900">
          <div className="space-y-3 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-neon-blue/10 border border-neon-blue/30 rounded-full font-mono text-[10px] tracking-widest text-neon-blue uppercase uppercase-bold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-blue opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-neon-blue"></span>
              </span>
              Cyber Intelligence Command Centre (CICC)
            </div>
            
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase leading-tight">
              Monitor de <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-cyan-400 to-purple-400">Ameaças Globais</span>
            </h2>
            <p className="font-sans text-gray-400 text-sm max-w-2xl leading-relaxed">
              Consola holográfica em tempo real para inteligência preditiva contra intrusões. 
              Visualize a propagação de vetores e <span className="text-neon-blue font-semibold">orbite, arraste ou interaja diretamente</span> com o globo para injetar nós de testes defensivos.
            </p>
          </div>


        </div>

        {/* THREE COLUMN STRATEGIC INTERACTIVE LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-4">
          
          {/* LEFT DASHBOARD SUB-CHARTS (3 COLS) */}
          <div className="lg:col-span-3 flex flex-col space-y-6">
            
            {/* Visual breakdown: Threat Types distributions */}
            <div className="bg-black/50 border border-gray-900 rounded-2xl p-5 text-left flex flex-col space-y-4 shadow-xl">
              <div className="flex items-center gap-2 pb-3 border-b border-gray-900">
                <Cpu className="w-4 h-4 text-neon-blue" />
                <h3 className="font-display text-xs font-bold uppercase tracking-wider text-white">Vetor de Ataques</h3>
              </div>
              
              <div className="flex-1 space-y-3 font-mono text-[10px]">
                {typePercentages.slice(0, 5).map((tp, idx) => {
                  const colorClass = tp.name === 'DDoS' || tp.name === 'Ransomware' ? 'bg-red-500' : 'bg-neon-blue';
                  return (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between items-center text-gray-400">
                        <span className="text-white font-semibold flex items-center gap-1.5">
                          <span className={`w-1 h-1 rounded-full ${colorClass}`} />
                          {tp.name}
                        </span>
                        <span>{tp.percentage}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-950 rounded-full overflow-hidden border border-gray-950/20">
                        <motion.div 
                          className={`h-full rounded-full ${tp.name === 'DDoS' || tp.name === 'Ransomware' ? 'bg-gradient-to-r from-red-600 to-amber-500' : 'bg-gradient-to-r from-cyan-500 to-purple-500'}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${tp.percentage}%` }}
                          transition={{ duration: 0.6 }}
                        />
                      </div>
                    </div>
                  );
                })}
                {typePercentages.length === 0 && (
                  <div className="text-center text-gray-600 py-10">Mapeando volumetria de logs...</div>
                )}
              </div>
            </div>

            {/* Top Threat Origin Geographic Indices */}
            <div className="bg-black/50 border border-gray-900 rounded-2xl p-5 text-left flex flex-col space-y-4 shadow-xl">
              <div className="flex items-center gap-2 pb-3 border-b border-gray-900">
                <Globe className="w-4 h-4 text-purple-400" />
                <h3 className="font-display text-xs font-bold uppercase tracking-wider text-white">Principais Origens</h3>
              </div>
              
              <div className="space-y-2.5 font-mono text-[10px]">
                {topOriginStatistics.map((stat, idx) => {
                  const percent = Math.round((stat.count / Math.max(1, events.length)) * 100);
                  return (
                    <div key={idx} className="flex justify-between items-center bg-gray-950/50 border border-gray-900 px-3 py-2 rounded-xl">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] text-gray-600">0{idx+1}</span>
                        <span className="text-gray-200">{stat.country}</span>
                      </div>
                      <span className="text-red-500 font-bold">-{percent}% índice</span>
                    </div>
                  );
                })}
                {topOriginStatistics.length === 0 && (
                  <div className="text-center text-gray-600 py-10">Aguardando telemetria IP...</div>
                )}
              </div>
            </div>

            {/* Tactical Control switches */}
            <div className="p-4 bg-black/40 border border-gray-950 rounded-2xl text-left space-y-3 font-mono text-[9.5px] text-gray-500">
              <span className="block uppercase tracking-wider text-gray-400 text-[8.5px] font-bold border-b border-gray-900 pb-2 mb-1">
                Controles da Consola
              </span>
              <div className="flex justify-between items-center">
                <span>Rotação Global</span>
                <button 
                  onClick={() => setAutoRotate(!autoRotate)}
                  className={`px-2 py-0.5 rounded border ${autoRotate ? 'text-neon-blue border-neon-blue/40 bg-neon-blue/5' : 'text-gray-600 border-gray-900'}`}
                >
                  {autoRotate ? 'AUTO_ROT' : 'STATIC'}
                </button>
              </div>
              <div className="flex justify-between items-center">
                <span>Visualizar Rede</span>
                <button 
                  onClick={() => setShowGrid(!showGrid)}
                  className={`px-2 py-0.5 rounded border ${showGrid ? 'text-neon-blue border-neon-blue/40 bg-neon-blue/5' : 'text-gray-600 border-gray-900'}`}
                >
                  {showGrid ? 'GRADE_ON' : 'GRADE_OFF'}
                </button>
              </div>
            </div>

          </div>

          {/* DRAGGABLE CANVASES AREA (6 COLS) */}
          <div className="lg:col-span-6 flex flex-col space-y-4">
            
            <div className="relative bg-[#02050a]/95 border border-gray-900 rounded-3xl overflow-hidden shadow-[inset_0_0_30px_rgba(0,186,255,0.05)] flex flex-col justify-between h-[450px] sm:h-[520px] lg:h-full min-h-[480px]">
              
              {/* Virtual scanning monitor stats */}
              <div className="absolute top-4 left-5 right-5 flex justify-between items-center z-30 pointer-events-none">
                <div className="flex items-center space-x-2.5 text-left bg-black/85 px-3 py-1.5 rounded-xl border border-gray-900/50 backdrop-blur-md">
                  <div className="w-1.5 h-1.5 rounded-full bg-neon-blue animate-ping" />
                  <div>
                    <span className="block font-mono text-[8px] text-gray-500 uppercase tracking-widest leading-none mb-0.5">Tactical Projection</span>
                    <span className="block font-mono text-[10px] text-white">ORBITAL INTERACTIVA SEC_ENG</span>
                  </div>
                </div>

                <div className="font-mono text-[8px] text-gray-500 bg-black/85 px-3 py-1.5 rounded-xl border border-gray-900/50 backdrop-blur-md text-right">
                  <span className="block">LAT_TILT: {viewAngle.tilt.toFixed(1)}°</span>
                  <span className="block">LON_ROT: {viewAngle.rotation.toFixed(1)}°</span>
                </div>
              </div>

              {/* HTML5 Canvas Globe Component */}
              <div className="flex-1 w-full h-full relative cursor-grab active:cursor-grabbing flex items-center justify-center">
                <canvas 
                  ref={canvasRef}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  className="w-full h-full max-h-[430px] sm:max-h-[500px]"
                />

                {/* Simulated center overlay details */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {/* Subtle dynamic background crosshair lines */}
                  <div className="w-72 h-72 rounded-full border border-neon-blue/[0.04] animate-pulse" />
                  <div className="w-96 h-96 absolute rounded-full border border-neon-blue/[0.02] animate-spin-slow" />
                </div>
              </div>

              {/* Interactive guidelines bottom banner */}
              <div className="absolute bottom-4 left-5 right-5 bg-black/80 border border-gray-900 p-2.5 rounded-2xl text-[9px] font-mono text-gray-400 backdrop-blur-sm z-30 pointer-events-none flex flex-col sm:flex-row justify-between gap-1.5 leading-none">
                <div className="flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5 text-neon-blue animate-spin-slow" />
                  <span>ARRASte NO GLOBO PARA ROTacionar</span>
                </div>
                <div>
                  <span className="text-neon-blue">CLIQUE EM QUALQUER SÍTIO PARA LANÇAR VETOR DE INTruSÃO</span>
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT TACTICAL LOGS & HUB SELECTION INTERFACES (3 COLS) */}
          <div className="lg:col-span-3 flex flex-col space-y-6">
            
            {/* Live intrusion ledger feeds console */}
            <div className="bg-black/50 border border-gray-900 rounded-2xl p-5 text-left flex flex-col h-[280px] lg:h-[300px] justify-between shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-gray-900">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-neon-blue" />
                  <h3 className="font-display text-xs font-bold uppercase tracking-wider text-white">Log de Intrusões</h3>
                </div>
                
                {/* Micro Category filtering tabs */}
                <select
                  value={activeFilter}
                  onChange={(e) => setActiveFilter(e.target.value)}
                  className="bg-gray-950 border border-gray-900 text-[8px] font-mono px-1.5 py-0.5 rounded text-gray-400 outline-none cursor-pointer hover:border-gray-800"
                >
                  <option value="TODOS">TODOS</option>
                  <option value="DDOS">DDOS</option>
                  <option value="BOTNET">BOTNET</option>
                  <option value="RANSOMWARE">RANSOM</option>
                </select>
              </div>

              {/* Ledger list block */}
              <div className="flex-1 overflow-y-auto space-y-2.5 my-3 pr-1 scrollbar-thin scrollbar-thumb-gray-900">
                <AnimatePresence initial={false}>
                  {filteredEvents.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center p-4 text-center text-gray-600 font-mono">
                      <Shield className="w-6 h-6 opacity-20 mb-2" />
                      <span className="text-[9px]">AGUARDANDO INTEGRALIDADE DE TRANSAÇÕES...</span>
                    </div>
                  ) : (
                    filteredEvents.slice(0, 15).map((ev) => {
                      const isCritical = ev.severity === 'CRÍTICA' || ev.severity === 'ALTA';
                      return (
                        <motion.div
                          key={ev.id}
                          layout="position"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className={`p-2.5 rounded-xl bg-gray-950/40 border ${ev.isCustom ? 'border-neon-blue/40 bg-neon-blue/[0.02]' : 'border-gray-900'} hover:border-gray-800 transition-all text-left text-[10px] space-y-1`}
                        >
                          <div className="flex items-center justify-between">
                            <span className={`px-1 py-0.5 rounded text-[7px] font-bold font-mono tracking-widest ${
                              isCritical ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-neon-blue/10 text-neon-blue border border-neon-blue/20'
                            }`}>
                              {ev.type}
                            </span>
                            <span className="text-gray-600 text-[8px] font-mono">{ev.timestamp}</span>
                          </div>

                          <div className="font-mono text-gray-300 truncate">
                            <span className="text-amber-500 font-semibold">{ev.originCountry}</span>
                            <span className="text-gray-600 mx-1">➜</span>
                            <span className="text-neon-blue">{ev.target.split(' (')[0].split(' ')[0]}</span>
                          </div>

                          <div className="flex justify-between items-center text-[7px] font-mono text-gray-500 pt-1 border-t border-gray-900/40">
                            <span>Siz: <strong className="text-gray-400">{ev.payloadSize.split(' ')[0]}</strong></span>
                            <span className={ev.status === 'BLOQUEADO' || ev.status === 'RECHASSADO' ? 'text-neon-green font-bold' : 'text-neon-blue font-bold'}>
                              {ev.status}
                            </span>
                          </div>
                        </motion.div>
                      );
                    })
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Selected secure Hub tactical telemetry telemetry display window */}
            <div className="flex-1 bg-black/50 border border-gray-900 rounded-3xl p-5 text-left flex flex-col justify-between shadow-xl relative min-h-[220px]">
              {selectedHub ? (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-[8px] font-mono font-black text-neon-green tracking-widest uppercase">
                        [ TELEMETRIA SEGURA_NÓ ]
                      </span>
                      <button 
                        onClick={() => setSelectedHub(null)}
                        className="p-1 rounded hover:bg-gray-900 text-gray-500 hover:text-white cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <h4 className="font-display text-sm font-bold text-white truncate">{selectedHub.name}</h4>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-[9.5px] font-mono pt-3 border-t border-gray-900/60">
                    <div>
                      <span className="text-gray-500 block">Endereço IP:</span>
                      <span className="text-white block font-bold">{selectedHub.ip}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Status Canal:</span>
                      <span className="text-neon-green block font-bold">ESTÁVEL</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Latência Média:</span>
                      <span className="text-white block">{selectedHub.ping} ms</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Carga IPS:</span>
                      <span className="text-amber-500 block">{selectedHub.trafficLoad + Math.floor(Math.sin(Date.now() / 2000) * 4)}% fluxo</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-gray-900/50">
                    <div className="flex justify-between items-center text-[8.5px] font-mono text-gray-500">
                      <span>Integridade Escudo:</span>
                      <span className="text-neon-blue">{selectedHub.shieldStrength}%</span>
                    </div>
                    <div className="h-1 bg-gray-950 rounded-full overflow-hidden border border-gray-950/20">
                      <div className="h-full bg-gradient-to-r from-neon-blue to-cyan-400 rounded-full" style={{ width: `${selectedHub.shieldStrength}%` }} />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col justify-center items-center text-center space-y-3.5 p-4 py-8">
                  <div className="w-10 h-10 rounded-full bg-neon-blue/5 border border-neon-blue/20 flex items-center justify-center animate-pulse">
                    <Server className="w-5 h-5 text-neon-blue" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">Aguardando Seleção</p>
                    <p className="font-sans text-xs text-gray-400 leading-relaxed">
                      Clique em um dos pontos brilhantes (<span className="text-neon-blue">SGs</span>) no Globo para inspecionar métricas do Gateway.
                    </p>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
