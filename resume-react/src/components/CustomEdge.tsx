// src/components/CustomEdge.tsx
import React from 'react';
import { getBezierPath, EdgeProps } from '@xyflow/react';

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}: EdgeProps) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    curvature: 0.3,
  });

  return (
    <g>
      {/* Glow effect */}
      <path
        d={edgePath}
        stroke={data?.glowColor || '#ffffff40'}
        strokeWidth="8"
        fill="none"
        opacity="0.6"
        filter="blur(4px)"
      />
      {/* Main line */}
      <path
        id={id}
        d={edgePath}
        stroke={data?.color || '#ffffff'}
        strokeWidth="3"
        fill="none"
        opacity="0.9"
      />
      {/* Animated dots */}
      <circle r="4" fill={data?.color || '#ffffff'} opacity="0.8">
        <animateMotion dur="3s" repeatCount="indefinite">
          <mpath href={`#${id}`} />
        </animateMotion>
      </circle>
    </g>
  );
}
