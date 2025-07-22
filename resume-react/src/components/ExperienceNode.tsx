// @ts-nocheck
// src/components/ExperienceNode.tsx
import React from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Badge } from "./ui/badge";
import styles from "../styles/ExperienceNode.module.css";

interface ExperienceNodeProps {
  id: string;
  label: string;
  subtitle: string;
  duration: string;
  highlights: string[];
  badges?: string[];
  color: string;
  glowColor: string;
  position: { x: number; y: number };
  connectTo?: string; // Add connection target
}

export default function ExperienceNode({
  id,
  label,
  subtitle,
  duration,
  highlights,
  badges = [],
  color,
  glowColor,
  position,
  connectTo,
}: ExperienceNodeProps) {
  return (
    <div
      className={`${styles.nodeWrapper} ${connectTo ? styles[`connect-${connectTo}`] : ''}`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        '--node-color': color,
        '--node-glow': glowColor,
      } as React.CSSProperties}
    >
      <HoverCard openDelay={300} closeDelay={100}>
        <HoverCardTrigger asChild>
          <div 
            className={styles.node}
            style={{ borderColor: color, color: color }}
          >
            <div className={styles.nodeTitle}>{label}</div>
            <div className={styles.nodeSubtitle}>{subtitle}</div>
          </div>
        </HoverCardTrigger>

        <HoverCardContent 
          className={styles.hoverCard}
          style={{ borderColor: color }}
          side="top"
          align="center"
        >
          <div className={styles.cardHeader} style={{ borderColor: color }}>
            <div className={styles.cardDuration}>{duration}</div>
            <div className={styles.cardTitle}>{label}</div>
            <div className={styles.cardSubtitle}>{subtitle}</div>
          </div>

          <div className={styles.badgesContainer}>
            {badges.map((badge, index) => (
              <Badge 
                key={index}
                className={styles.badge}
                style={{ backgroundColor: color }}
              >
                {badge}
              </Badge>
            ))}
          </div>

          <div className={styles.highlightsContainer}>
            {highlights.map((highlight, index) => (
              <div key={index} className={styles.highlight}>
                <span className={styles.bullet} style={{ color: color }}>
                  •
                </span>
                <span className={styles.highlightText}>{highlight}</span>
              </div>
            ))}
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
