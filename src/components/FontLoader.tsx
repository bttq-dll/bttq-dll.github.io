'use client';

import { useEffect } from 'react';

export default function FontLoader() {
  useEffect(() => {
    // Try to detect if Inter loaded
    const checkFont = () => {
      if (document.fonts) {
        document.fonts.ready.then(() => {
          const interLoaded = Array.from(document.fonts).some(
            font => font.family.includes('Inter')
          );
          
          if (!interLoaded) {
            // Load from alternative source
            const style = document.createElement('style');
            style.textContent = `
              @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
            `;
            document.head.appendChild(style);
          }
        });
      }
    };

    checkFont();
  }, []);

  return null;
}