// src/App.tsx
import React, { useState, useCallback, useRef } from 'react';
import Particles from './components/Particles';
import SplashCursor from './components/SplashCursor';
import TextType from './components/TextType';
import ContactCodeEditor from './components/ContactCodeEditor';
import ExperienceNode from './components/ExperienceNode';
import styles from './styles/Resume.module.css';

// Simple draggable hook with connection updates
const useDraggable = (initialPosition: { x: number; y: number }, onPositionChange?: (pos: { x: number; y: number }) => void) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    const startX = e.clientX - position.x;
    const startY = e.clientY - position.y;

    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = {
        x: e.clientX - startX,
        y: e.clientY - startY,
      };
      setPosition(newPosition);
      onPositionChange?.(newPosition);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [position, onPositionChange]);

  return { position, isDragging, handleMouseDown };
};

const experiences = [
  {
    id: "bridgeblue",
    label: "AMS BridgeBlue",
    subtitle: "Lead Product Manager",
    duration: "2015–2019",
    color: "#ef4444",
    glowColor: "#ef444480",
    position: { x: 200, y: 400 },
    badges: ["EdTech", "International", "B2B"],
    highlights: [
      "Cross-university portal → +230% applications",
      "Loyalty engine → $17M+ revenue",
      "Led 15-person international team across 3 countries"
    ],
    connectsTo: ["halfort"]
  },
  {
    id: "halfort",
    label: "Halfort LLC",
    subtitle: "Product Lead",
    duration: "2019–2023",
    color: "#8b5cf6",
    glowColor: "#8b5cf680",
    position: { x: 500, y: 200 },
    badges: ["FinTech", "HealthTech", "SaaS"],
    highlights: [
      "Built payment platform → 90K MAUs & $10M Year 1",
      "UX optimizations → +150% patient payments",
      "Reduced payment processing time by 67%"
    ],
    connectsTo: ["scale"]
  },
  {
    id: "scale",
    label: "S.C.A.L.E Framework",
    subtitle: "Creator & Author",
    duration: "2024–Present",
    color: "#f59e0b",
    glowColor: "#f59e0b80",
    position: { x: 600, y: 100 },
    badges: ["Thought Leadership", "Framework", "Innovation"],
    highlights: [
      "Published PM framework → 20–45% fewer delays",
      "15–30% improvement in on-time delivery",
      "Adopted by 3 enterprise teams"
    ],
    connectsTo: ["stukent"]
  },
  {
    id: "stukent",
    label: "Stukent",
    subtitle: "Group Product Manager",
    duration: "2019–Present",
    color: "#06b6d4",
    glowColor: "#06b6d480",
    position: { x: 800, y: 300 },
    badges: ["AI Innovation", "EdTech", "Analytics"],
    highlights: [
      "Designed AI explainer & scoring → +140% engagement",
      "Launched Google Classroom integration → +80% market reach",
      "Led product strategy for 5 product lines"
    ],
    connectsTo: []
  },
];

// Connection Lines Component
const ConnectionLines = ({ nodePositions }: { nodePositions: Record<string, { x: number; y: number }> }) => {
  const connections = [
    { from: "bridgeblue", to: "halfort", color: "#ef4444", glowColor: "#ef444480" },
    { from: "halfort", to: "scale", color: "#8b5cf6", glowColor: "#8b5cf680" },
    { from: "scale", to: "stukent", color: "#f59e0b", glowColor: "#f59e0b80" }
  ];

  return (
    <svg className={styles.connectionSvg}>
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {connections.map((conn, idx) => {
        const fromPos = nodePositions[conn.from];
        const toPos = nodePositions[conn.to];
        
        if (!fromPos || !toPos) return null;

        // Calculate connection points (center of nodes)
        const startX = fromPos.x + 130; // Half of node width
        const startY = fromPos.y + 40;  // Half of node height
        const endX = toPos.x + 130;
        const endY = toPos.y + 40;

        // Create smooth bezier curve
        const controlPoint1X = startX + (endX - startX) * 0.3;
        const controlPoint1Y = startY - 50;
        const controlPoint2X = startX + (endX - startX) * 0.7;
        const controlPoint2Y = endY - 50;

        const pathData = `M ${startX} ${startY} C ${controlPoint1X} ${controlPoint1Y}, ${controlPoint2X} ${controlPoint2Y}, ${endX} ${endY}`;

        return (
          <g key={`connection-${idx}`}>
            {/* Glow effect */}
            <path
              d={pathData}
              stroke={conn.glowColor}
              strokeWidth="8"
              fill="none"
              opacity="0.6"
              filter="url(#glow)"
            />
            {/* Main line */}
            <path
              id={`path-${idx}`}
              d={pathData}
              stroke={conn.color}
              strokeWidth="3"
              fill="none"
              opacity="0.9"
            />
            {/* Animated dot traveling along the line */}
            <circle r="6" fill={conn.color} opacity="0.8">
              <animateMotion dur="3s" repeatCount="indefinite">
                <mpath href={`#path-${idx}`} />
              </animateMotion>
            </circle>
            {/* Connection points */}
            <circle
              cx={startX}
              cy={startY}
              r="4"
              fill={conn.color}
              opacity="0.7"
            />
            <circle
              cx={endX}
              cy={endY}
              r="4"
              fill={conn.color}
              opacity="0.7"
            />
          </g>
        );
      })}
    </svg>
  );
};

// Draggable node wrapper
const DraggableExperienceNode = ({ 
  experience, 
  onPositionChange 
}: { 
  experience: any; 
  onPositionChange: (id: string, pos: { x: number; y: number }) => void;
}) => {
  const { position, isDragging, handleMouseDown } = useDraggable(
    experience.position,
    (newPos) => onPositionChange(experience.id, newPos)
  );

  return (
    <div
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        cursor: isDragging ? 'grabbing' : 'grab',
        zIndex: isDragging ? 20 : 10,
        transform: isDragging ? 'scale(1.05)' : 'scale(1)',
        transition: isDragging ? 'none' : 'transform 0.2s ease',
        filter: isDragging ? `drop-shadow(0 20px 40px ${experience.glowColor})` : 'none',
      }}
      onMouseDown={handleMouseDown}
    >
      <ExperienceNode
        id={experience.id}
        label={experience.label}
        subtitle={experience.subtitle}
        duration={experience.duration}
        highlights={experience.highlights}
        badges={experience.badges}
        color={experience.color}
        glowColor={experience.glowColor}
        position={{ x: 50, y: 50 }}
      />
    </div>
  );
};

export default function App() {
  const [nodePositions, setNodePositions] = useState(() => {
    const positions: Record<string, { x: number; y: number }> = {};
    experiences.forEach(exp => {
      positions[exp.id] = exp.position;
    });
    return positions;
  });

  const handlePositionChange = useCallback((id: string, newPosition: { x: number; y: number }) => {
    setNodePositions(prev => ({
      ...prev,
      [id]: newPosition
    }));
  }, []);

  return (
    <div className={styles.resumePage}>
      {/* Particle background */}
      <Particles
        className={styles.particles}
        particleCount={150}
        particleSpread={12}
        speed={0.15}
        particleColors={['#ffffff', '#e0e7ff', '#c7d2fe']}
        alphaParticles={true}
        particleBaseSize={80}
        sizeRandomness={0.8}
      />
      
      {/* Fluid cursor effect */}
      <SplashCursor />
      
      {/* Main header */}
      <div className={styles.header}>
        <h1 className={styles.mainTitle}>Shazil Sindhu</h1>
        <TextType
          text="I build delightful user experiences."
          className={styles.tagline}
          typingSpeed={80}
          showCursor={false}
          initialDelay={500}
        />
      </div>

      {/* Interactive Career Map */}
      <div className={styles.careerMapContainer}>
        {/* Dynamic connection lines */}
        <ConnectionLines nodePositions={nodePositions} />
        
        {/* Draggable nodes */}
        <div className={styles.nodesContainer}>
          {experiences.map((exp) => (
            <DraggableExperienceNode
              key={exp.id}
              experience={exp}
              onPositionChange={handlePositionChange}
            />
          ))}
        </div>
      </div>

      {/* Contact code editor */}
      <ContactCodeEditor />
    </div>
  );
}
