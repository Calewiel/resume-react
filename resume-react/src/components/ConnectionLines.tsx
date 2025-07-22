// src/components/ConnectionLines.tsx
import React from "react";

interface Experience {
  id: string;
  position: { x: number; y: number };
  color: string;
}

interface ConnectionLinesProps {
  experiences: Experience[];
  connections: { from: string; to: string }[];
}

export default function ConnectionLines({ experiences, connections }: ConnectionLinesProps) {
  const getExperienceById = (id: string) => experiences.find(exp => exp.id === id);

  return (
    <>
      <defs>
        {connections.map((conn, idx) => {
          const from = getExperienceById(conn.from);
          const to = getExperienceById(conn.to);
          if (!from || !to) return null;

          return (
            <linearGradient
              key={`grad-${idx}`}
              id={`grad-${conn.from}-${conn.to}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor={from.color} stopOpacity="0.8">
                <animate
                  attributeName="stopOpacity"
                  values="0.4;0.8;0.4"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="50%" stopColor={from.color} stopOpacity="1" />
              <stop offset="100%" stopColor={to.color} stopOpacity="0.8">
                <animate
                  attributeName="stopOpacity"
                  values="0.4;0.8;0.4"
                  dur="3s"
                  repeatCount="indefinite"
                  begin="1.5s"
                />
              </stop>
            </linearGradient>
          );
        })}
      </defs>

      {connections.map((conn, idx) => {
        const from = getExperienceById(conn.from);
        const to = getExperienceById(conn.to);
        if (!from || !to) return null;

        // Calculate path for smooth curve
        const startX = `${from.position.x}%`;
        const startY = `${from.position.y}%`;
        const endX = `${to.position.x}%`;
        const endY = `${to.position.y}%`;
        
        // Control points for bezier curve
        const cp1X = `${from.position.x + (to.position.x - from.position.x) * 0.5}%`;
        const cp1Y = `${from.position.y - 10}%`;
        const cp2X = `${from.position.x + (to.position.x - from.position.x) * 0.5}%`;
        const cp2Y = `${to.position.y - 10}%`;

        return (
          <g key={`conn-${idx}`}>
            {/* Glow effect */}
            <path
              d={`M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`}
              stroke={`url(#grad-${conn.from}-${conn.to})`}
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              opacity="0.3"
              filter="blur(4px)"
            />
            {/* Main line */}
            <path
              d={`M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`}
              stroke={`url(#grad-${conn.from}-${conn.to})`}
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              opacity="0.9"
            >
              <animate
                attributeName="stroke-dasharray"
                values="0 1000;1000 0"
                dur="2s"
                repeatCount="1"
              />
            </path>
          </g>
        );
      })}
    </>
  );
}