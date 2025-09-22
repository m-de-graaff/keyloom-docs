import * as React from "react";

type SvgProps = React.SVGProps<SVGSVGElement> & { title?: string };

const BaseIcon: React.FC<SvgProps & { label: string }> = ({
  label,
  children,
  ...props
}) => (
  <svg
    viewBox="0 0 24 24"
    width={20}
    height={20}
    aria-label={label}
    role="img"
    focusable="false"
    {...props}
  >
    {children}
  </svg>
);

export const NpmIcon: React.FC<SvgProps> = (props) => (
  <BaseIcon label="npm" {...props}>
    <rect x="2" y="5" width="20" height="14" rx="2" fill="currentColor" />
    <rect x="4" y="9" width="4" height="6" fill="white" />
    <rect x="10" y="9" width="4" height="6" fill="white" />
    <rect x="16" y="9" width="4" height="6" fill="white" />
  </BaseIcon>
);

export const PnpmIcon: React.FC<SvgProps> = (props) => (
  <BaseIcon label="pnpm" {...props}>
    <g fill="currentColor">
      <rect x="4" y="4" width="6" height="6" rx="1" />
      <rect x="14" y="4" width="6" height="6" rx="1" />
      <rect x="4" y="14" width="6" height="6" rx="1" />
      <rect x="14" y="14" width="6" height="6" rx="1" />
    </g>
  </BaseIcon>
);

export const YarnIcon: React.FC<SvgProps> = (props) => (
  <BaseIcon label="yarn" {...props}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none" />
    <path
      d="M7 13c2-1 4-1 6 0s4 1 6 0"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />
    <path d="M8 9c3 2 7 2 10 0" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
  </BaseIcon>
);

export const BunIcon: React.FC<SvgProps> = (props) => (
  <BaseIcon label="bun" {...props}>
    <ellipse cx="12" cy="12" rx="9" ry="7" fill="currentColor" />
    <path d="M6 11c4 2 8 2 12 0" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <circle cx="9.5" cy="12.5" r="0.9" fill="white" />
    <circle cx="14.5" cy="12.5" r="0.9" fill="white" />
  </BaseIcon>
);

