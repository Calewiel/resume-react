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
}: ExperienceNodeProps) {
  return (
    <div
      className={styles.nodeWrapper}
      style={{ 
        left: `${position.x}%`, 
        top: `${position.y}%`,
      }}
    >
      <HoverCard openDelay={0} closeDelay={100}>
        <HoverCardTrigger asChild>
          <div
            className={styles.node}
            style={{
              borderColor: color,
              boxShadow: `
                0 0 30px ${glowColor}, 
                0 0 60px ${glowColor}, 
                inset 0 0 30px ${glowColor}20
              `,
            }}
          >
            <h3 className={styles.nodeTitle} style={{ color }}>
              {label}
            </h3>
            <p className={styles.nodeSubtitle}>{subtitle}</p>
          </div>
        </HoverCardTrigger>

        <HoverCardContent
          side="top"
          align="center"
          className={styles.hoverCard}
          style={{
            borderColor: color,
            boxShadow: `0 0 40px ${glowColor}40`,
          }}
        >
          <div className={styles.cardHeader} style={{ borderColor: `${color}30` }}>
            <p className={styles.cardDuration}>{duration}</p>
            <h3 className={styles.cardTitle}>{label}</h3>
            <p className={styles.cardSubtitle}>{subtitle}</p>
          </div>

          {badges.length > 0 && (
            <div className={styles.badgesContainer}>
              {badges.map((badge, idx) => (
                <span
                  key={idx}
                  className={styles.badge}
                  style={{ 
                    backgroundColor: color,
                    boxShadow: `0 2px 10px ${glowColor}60`
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>
          )}

          <div className={styles.highlightsContainer}>
            {highlights.map((item, idx) => (
              <div key={idx} className={styles.highlight}>
                <span className={styles.bullet} style={{ color }}>→</span>
                <p className={styles.highlightText}>{item}</p>
              </div>
            ))}
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}