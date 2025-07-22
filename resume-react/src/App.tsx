// src/App.tsx
import React from "react";
import Particles from "./components/Particles";
import SplashCursor from "./components/SplashCursor";
import TextType from "./components/TextType";
import ContactCodeEditor from "./components/ContactCodeEditor";
import ExperienceNode from "./components/ExperienceNode";
import styles from "./styles/Resume.module.css";

const experiences = [
  {
    id: "bridgeblue",
    label: "AMS BridgeBlue",
    subtitle: "Lead Product Manager",
    duration: "2015–2019",
    color: "#ef4444",
    glowColor: "#ef444480",
    position: { x: 20, y: 70 },
    badges: ["EdTech", "International", "B2B"],
    highlights: [
      "Cross-university portal → +230% applications",
      "Loyalty engine → $17M+ revenue",
      "Led 15-person international team across 3 countries"
    ],
  },
  {
    id: "halfort",
    label: "Halfort LLC",
    subtitle: "Product Lead",
    duration: "2019–2023",
    color: "#8b5cf6",
    glowColor: "#8b5cf680",
    position: { x: 40, y: 50 },
    badges: ["FinTech", "HealthTech", "SaaS"],
    highlights: [
      "Built payment platform → 90K MAUs & $10M Year 1",
      "UX optimizations → +150% patient payments",
      "Reduced payment processing time by 67%"
    ],
  },
  {
    id: "stukent",
    label: "Stukent",
    subtitle: "Group Product Manager",
    duration: "2019–Present",
    color: "#06b6d4",
    glowColor: "#06b6d480",
    position: { x: 70, y: 55 },
    badges: ["AI Innovation", "EdTech", "Analytics"],
    highlights: [
      "Designed AI explainer & scoring → +140% engagement",
      "Launched Google Classroom integration → +80% market reach",
      "Led product strategy for 5 product lines"
    ],
  },
  {
    id: "scale",
    label: "S.C.A.L.E Framework",
    subtitle: "Creator & Author",
    duration: "2024–Present",
    color: "#f59e0b",
    glowColor: "#f59e0b80",
    position: { x: 50, y: 25 },
    badges: ["Thought Leadership", "Framework", "Innovation"],
    highlights: [
      "Published PM framework → 20–45% fewer delays",
      "15–30% improvement in on-time delivery",
      "Adopted by 3 enterprise teams"
    ],
  },
];

export default function App() {
  return (
    <div className={styles.resumePage}>
      <Particles className={styles.particles} />
      <SplashCursor />

      {/* Animated Stars Background */}
      <div className={styles.starsContainer}>
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className={styles.star}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <header className={styles.header}>
        <h1 className={styles.mainTitle}>Shazil Sindhu</h1>
        <div className={styles.tagline}>
          <TextType
            text={["I build delightful user experiences."]}
            typingSpeed={45}
            loop={false}
            textColors={["#ffffff"]}
          />
        </div>
      </header>

      <div className={styles.careerMapContainer}>
        {/* Simple CSS Connection Lines */}
        <div className={styles.connectionsWrapper}>
          <div className={`${styles.connectionLine} ${styles.line1}`} />
          <div className={`${styles.connectionLine} ${styles.line2}`} />
          <div className={`${styles.connectionLine} ${styles.line3}`} />
        </div>
        
        {/* Experience Nodes */}
        <div className={styles.nodesContainer}>
          {experiences.map((exp) => (
            <ExperienceNode key={exp.id} {...exp} />
          ))}
        </div>
      </div>

      <ContactCodeEditor />
    </div>
  );
}