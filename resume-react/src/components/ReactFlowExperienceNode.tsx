// src/components/ReactFlowExperienceNode.tsx
import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';
import { Badge } from './ui/badge';
import styles from '../styles/ExperienceNode.module.css';

interface ExperienceData {
  label: string;
  subtitle: string;
  duration: string;
  highlights: string[];
  badges?: string[];
  color: string;
  glowColor: string;
}

export default function ReactFlowExperienceNode({ data }: NodeProps<ExperienceData>) {
  return (
    <div className={styles.nodeWrapper}>
      {/* Connection handles - invisible but functional */}
      <Handle
        type="target"
        position={Position.Left}
        style={{ opacity: 0 }}
        isConnectable={true}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{ opacity: 0 }}
        isConnectable={true}
      />

      <HoverCard openDelay={300} closeDelay={100}>
        <HoverCardTrigger asChild>
          <div 
            className={styles.node}
            style={{ 
              borderColor: data.color, 
              color: data.color,
              boxShadow: `0 0 20px ${data.glowColor}`,
            }}
          >
            <div className={styles.nodeTitle}>{data.label}</div>
            <div className={styles.nodeSubtitle}>{data.subtitle}</div>
          </div>
        </HoverCardTrigger>

        <HoverCardContent 
          className={styles.hoverCard}
          style={{ borderColor: data.color }}
          side="top"
          align="center"
        >
          <div className={styles.cardHeader} style={{ borderColor: data.color }}>
            <div className={styles.cardDuration}>{data.duration}</div>
            <div className={styles.cardTitle}>{data.label}</div>
            <div className={styles.cardSubtitle}>{data.subtitle}</div>
          </div>

          <div className={styles.badgesContainer}>
            {data.badges?.map((badge, index) => (
              <Badge 
                key={index}
                className={styles.badge}
                style={{ backgroundColor: data.color }}
              >
                {badge}
              </Badge>
            ))}
          </div>

          <div className={styles.highlightsContainer}>
            {data.highlights.map((highlight, index) => (
              <div key={index} className={styles.highlight}>
                <span className={styles.bullet} style={{ color: data.color }}>•</span>
                <span className={styles.highlightText}>{highlight}</span>
              </div>
            ))}
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
