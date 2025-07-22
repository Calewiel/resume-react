import { useEffect, useRef, useState } from 'react';
import styles from '../styles/Resume.module.css';

const codeLines = [
  'interface ContactInfo {',
  '  name: "Shazil Sindhu";',
  '  title: "Strategic SaaS Product Leader";',
  '  email: "snsindhu@gmail.com";',
  '  phone: "(804) 873–9174";',
  '  linkedin: "in/shazilsindhu";',
  '  framework: "S.C.A.L.E";',
  '  location: "San Jose, CA";',
  '  experience: "13+ years";',
  '}',
  '',
  '// Click any contact field to connect! 🚀'
];

export const ContactCodeEditor = () => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [lineIndex, setLineIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lineIndex < codeLines.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, codeLines[lineIndex]]);
        setLineIndex((prev) => prev + 1);
      }, 400); // adjust typing speed here
      return () => clearTimeout(timeout);
    }
  }, [lineIndex]);

  return (
    <div
      ref={containerRef}
      className={styles.codeEditor}
    >
      <div className={styles.editorHeader}>
        <span className={styles.circle} style={{ backgroundColor: '#ff5f56' }} />
        <span className={styles.circle} style={{ backgroundColor: '#ffbd2e' }} />
        <span className={styles.circle} style={{ backgroundColor: '#27c93f' }} />
        <span className={styles.editorTitle}>contact.ts</span>
      </div>
      <pre className={styles.editorBody}>
        <code>
          {displayedLines.map((line, i) => (
            <div key={i} className={styles.codeLine}>
              {line}
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
};

export default ContactCodeEditor;
