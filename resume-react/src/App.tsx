// src/App.tsx
import React from "react";
import Particles from "./components/Particles";
import SplashCursor from "./components/SplashCursor";
import TextType from "./components/TextType";
import ContactCodeEditor from "./components/ContactCodeEditor";
import ExperienceNode from "./components/ExperienceNode";
import styles from "./styles/Resume.module.css";

export default function App() {
  return (
    <div className={styles.resumePage}>
      <Particles />
      <SplashCursor />

      <header className={styles.header}>
        <h1>Shazil Sindhu</h1>
        <div className={styles.tagline}>
          <TextType
            text={["I build delightful user experiences."]}
            typingSpeed={45}
            loop={false}
          />
        </div>
      </header>

      <div className={styles.careerMap}>
        <ExperienceNode
          label="Stukent"
          subtitle="Group Product Manager"
          duration="2019–Present"
          color="purple"
          badges={["AI Innovation", "EdTech", "Analytics"]}
          highlights={[
            "Designed AI explainer & scoring → +140% engagement",
            "Launched Google Classroom integration → +80% market reach",
          ]}
        />

        <ExperienceNode
          label="Halfort LLC"
          subtitle="Product Lead"
          duration="2019–2023"
          color="green"
          badges={["FinTech", "HealthTech", "SaaS"]}
          highlights={[
            "Built payment platform → 90K MAUs & $10M Year 1",
            "UX optimizations → +150% patient payments",
          ]}
        />

        <ExperienceNode
          label="AMS BridgeBlue"
          subtitle="Lead Product Manager"
          duration="2015–2019"
          color="red"
          badges={["EdTech", "International", "B2B"]}
          highlights={[
            "Cross-university portal → +230% applications",
            "Loyalty engine → $17M+ revenue",
          ]}
        />

        <ExperienceNode
          label="S.C.A.L.E Framework"
          subtitle="Creator & Author"
          duration="2024–Present"
          color="indigo"
          badges={["Thought Leadership", "Framework"]}
          highlights={[
            "Published PM framework → 20–45% fewer delays",
            "15–30% improvement in on-time delivery",
          ]}
        />
      </div>

      <ContactCodeEditor />
    </div>
  );
}