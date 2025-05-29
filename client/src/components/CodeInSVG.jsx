import React from 'react';

const CodeInSVG = ({ width = 40, height = 40, className = '' }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Gradient definitions */}
      <defs>
        <linearGradient id="bgGradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="50%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Background circle with gradient */}
      <circle cx="20" cy="20" r="19" fill="url(#bgGradient)" />
      
      {/* Inner circle for depth */}
      <circle cx="20" cy="20" r="17" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      
      {/* Code brackets with glow */}
      <path
        d="M15 12L12 20L15 28M25 12L28 20L25 28"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#glow)"
      />
      
      {/* "IN" text with glow */}
      <path
        d="M18 16H22M18 24H22"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        filter="url(#glow)"
      />

      {/* Shine effect */}
      <path
        d="M20 8C20 8 22 12 20 20C18 28 20 32 20 32"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default CodeInSVG; 