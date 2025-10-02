import React from 'react';

interface TableProps {
  headers: string[];
  rows: string[][];
  className?: string;
}

export function Table({ headers, rows, className = '' }: TableProps) {
  return (
    <div className={`relative flex flex-col w-full overflow-x-auto rounded-lg border border-border bg-card shadow-sm ${className}`}>
      <table className="w-full text-left table-auto">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            {headers.map((header, i) => (
              <th 
                key={i} 
                className="px-4 py-3 text-sm font-semibold text-foreground first:pl-6 last:pr-6"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr 
              key={i} 
              className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors"
            >
              {row.map((cell, j) => (
                <td 
                  key={j} 
                  className="px-4 py-3 text-sm text-muted-foreground first:pl-6 last:pr-6"
                  dangerouslySetInnerHTML={{ __html: cell }}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
