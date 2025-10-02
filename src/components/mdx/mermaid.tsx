'use client';

import { useTheme } from 'next-themes';
import { useEffect, useRef } from 'react';

interface MermaidProps {
  chart: string;
  className?: string;
}

export function Mermaid({ chart, className = '' }: MermaidProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const renderChart = async () => {
      if (!ref.current) return;

      try {
        const mermaid = (await import('mermaid')).default;
        
        // Configure mermaid with theme
        mermaid.initialize({
          startOnLoad: false,
          theme: theme === 'dark' ? 'dark' : 'default',
          themeVariables: {
            primaryColor: theme === 'dark' ? '#3b82f6' : '#2563eb',
            primaryTextColor: theme === 'dark' ? '#f8fafc' : '#1e293b',
            primaryBorderColor: theme === 'dark' ? '#475569' : '#cbd5e1',
            lineColor: theme === 'dark' ? '#64748b' : '#475569',
            secondaryColor: theme === 'dark' ? '#1e293b' : '#f1f5f9',
            tertiaryColor: theme === 'dark' ? '#0f172a' : '#ffffff',
          },
        });

        // Clear previous content
        ref.current.innerHTML = '';

        // Generate unique ID for this chart
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

        // Render the chart
        const { svg } = await mermaid.render(id, chart);
        ref.current.innerHTML = svg;
      } catch (error) {
        console.error('Failed to render Mermaid chart:', error);
        ref.current.innerHTML = `
          <div class="p-4 border border-red-200 rounded-lg bg-red-50 text-red-800">
            <p class="font-medium">Failed to render diagram</p>
            <pre class="mt-2 text-sm whitespace-pre-wrap">${chart}</pre>
          </div>
        `;
      }
    };

    renderChart();
  }, [chart, theme]);

  return (
    <div 
      ref={ref} 
      className={`my-6 flex justify-center ${className}`}
    />
  );
}
