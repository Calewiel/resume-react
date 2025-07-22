// @ts-nocheck
// src/components/ContactCodeEditor.tsx
import { useEffect, useRef, useState } from 'react';
import styles from '../styles/ContactCodeEditor.module.css';

const codeLines = [
  { text: 'interface ContactInfo {', className: 'keyword' },
  { text: '  name: "Shazil Sindhu";', className: 'property' },
  { text: '  title: "Strategic SaaS Product Leader";', className: 'property' },
  { text: '  email: "snsindhu@gmail.com";', className: 'property' },
  { text: '  phone: "(804) 873-9174";', className: 'property' },
  { text: '  linkedin: "in/shazilsindhu";', className: 'property' },
  { text: '  framework: "S.C.A.L.E";', className: 'property' },
  { text: '  location: "San Jose, CA";', className: 'property' },
  { text: '  experience: "13+ years";', className: 'property' },
  { text: '}', className: 'keyword' },
  { text: '', className: '' },
  { text: '// Click any contact field to connect! 🚀', className: 'comment' }
];

export const ContactCodeEditor = () => {
  const [displayedLines, setDisplayedLines] = useState<typeof codeLines>([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lineIndex < codeLines.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, codeLines[lineIndex]]);
        setLineIndex((prev) => prev + 1);
      }, 200);
      return () => clearTimeout(timeout);
    } else {
      setIsTypingComplete(true);
    }
  }, [lineIndex]);

  const handleContactClick = (field: string, value: string) => {
    // Remove quotes from value
    const cleanValue = value.replace(/[";]/g, '');
    
    switch(field) {
      case 'email':
        window.open(`mailto:${cleanValue}`);
        break;
      case 'phone':
        window.open(`tel:${cleanValue}`);
        break;
      case 'linkedin':
        window.open(`https://linkedin.com/${cleanValue}`, '_blank');
        break;
      default:
        // Copy to clipboard for other fields
        navigator.clipboard.writeText(cleanValue);
        break;
    }
  };

  const renderLine = (line: typeof codeLines[0], index: number) => {
    if (line.className === 'property' && isTypingComplete) {
      const [field, ...valueParts] = line.text.trim().split(':');
      const value = valueParts.join(':');
      const fieldName = field.trim();
      
      return (
        <div key={index} className={`${styles.codeLine} ${styles[line.className]}`}>
          <span className={styles.propertyName}>{field}:</span>
          <span 
            className={styles.propertyValue}
            onClick={() => handleContactClick(fieldName, value)}
            title={`Click to ${fieldName === 'email' ? 'send email' : fieldName === 'phone' ? 'call' : fieldName === 'linkedin' ? 'visit profile' : 'copy'}`}
          >
            {value}
          </span>
        </div>
      );
    }
    
    return (
      <div key={index} className={`${styles.codeLine} ${styles[line.className]}`}>
        {line.text}
      </div>
    );
  };

  return (
    <div ref={containerRef} className={styles.codeEditor}>
      <div className={styles.editorHeader}>
        <div className={styles.windowControls}>
          <span className={styles.circle} style={{ backgroundColor: '#ff5f56' }} />
          <span className={styles.circle} style={{ backgroundColor: '#ffbd2e' }} />
          <span className={styles.circle} style={{ backgroundColor: '#27c93f' }} />
        </div>
        <span className={styles.editorTitle}>contact.ts</span>
      </div>
      <pre className={styles.editorBody}>
        <code>
          {displayedLines.map((line, i) => renderLine(line, i))}
          {!isTypingComplete && <span className={styles.cursor}>|</span>}
        </code>
      </pre>
    </div>
  );
};

export default ContactCodeEditor;