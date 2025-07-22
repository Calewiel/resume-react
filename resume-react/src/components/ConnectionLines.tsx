// src/components/ConnectionLines.tsx
import React from "react";

interface Experience {
  id: string;
  position: { x: number; y: number };
  color: string;
  glowColor: string;
}

interface ConnectionLinesProps {
  experiences: Experience[];
  connections: { from: string; to: string }[];
}

export default function ConnectionLines({ experiences, connections }: ConnectionLinesProps) {
  const getExperienceById = (id: string) => experiences.find(exp => exp.id === id);

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
      <defs>
        {/* Add glow filter */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {connections.map((conn, idx) => {
        const from = getExperienceById(conn.from);
        const to = getExperienceById(conn.to);
        if (!from || !to) return null;

        // Convert percentages to actual coordinates (SVG viewBox is 100x100)
        const startX = from.position.x;
        const startY = from.position.y;
        const endX = to.position.x;
        const endY = to.position.y;

        // Create smooth bezier curve
        const controlPoint1X = startX + (endX - startX) * 0.3;
        const controlPoint1Y = startY - 8;
        const controlPoint2X = startX + (endX - startX) * 0.7;
        const controlPoint2Y = endY - 8;

        // Create path without percentage signs
        const pathData = `M ${startX} ${startY} C ${controlPoint1X} ${controlPoint1Y}, ${controlPoint2X} ${controlPoint2Y}, ${endX} ${endY}`;

        return (
          <g key={`connection-${idx}`}>
            {/* Glow effect line */}
            <path
              d={pathData}
              stroke={from.glowColor}
              strokeWidth="6"
              fill="none"
              opacity="0.6"
              filter="url(#glow)"
            />
            {/* Main line */}
            <path
              d={pathData}
              stroke={from.color}
              strokeWidth="2"
              fill="none"
              opacity="0.9"
            />
            {/* Start dot */}
            <circle
              cx={startX}
              cy={startY}
              r="4"
              fill={from.color}
              opacity="0.8"
            />
            {/* End dot */}
            <circle
              cx={endX}
              cy={endY}
              r="4"
              fill={to.color}
              opacity="0.8"
            />
          </g>
        );
      })}
    </svg>
  );
}
