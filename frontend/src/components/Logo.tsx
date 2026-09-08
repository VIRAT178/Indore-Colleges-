/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  light?: boolean;
}

export function LogoIcon({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg 
      viewBox="10 0 82 90" 
      className={className} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Light red 'i' dot - perfectly aligned and sized */}
      <circle cx="24.5" cy="11" r="8.5" fill="#EF4444" />

      {/* Light red 'i' body - increased length/height with sharp slightly-rounded corners */}
      <rect x="15" y="24" width="19" height="44" rx="2" fill="#EF4444" />

      {/* Dark crimson 'c' looping arc with flat-cut butt ends - shifted to create a beautiful gap */}
      <path 
        d="M 43,41 C 62,41 78,42 78,58 C 78,74 62,76 26,76" 
        stroke="#EF4444" 
        strokeWidth="15.5" 
        strokeLinecap="butt" 
        fill="none" 
      />
    </svg>
  );
}

export default function Logo({ className = "", iconOnly = false, light = false }: LogoProps) {
  const textColor = light ? '#FFFFFF' : '#1F2937';
  const textMutedColor = light ? 'rgba(255, 255, 255, 0.85)' : '#4B5563';

  return (
    <div className={`flex items-center select-none ${className}`}>
      {iconOnly ? (
        <LogoIcon className="h-9 w-9 sm:h-10 sm:w-10 shrink-0 transition-transform duration-300 group-hover:scale-105" />
      ) : (
        <div className="flex items-center group">
          <LogoIcon className="h-10 w-10 sm:h-11 sm:w-11 shrink-0 mr-1 sm:mr-1.5 transition-transform duration-300 group-hover:scale-105" />
          <div className="flex flex-col justify-center">
            <span 
              className="text-[16px] sm:text-[18px] font-medium tracking-tight leading-none"
              style={{ fontFamily: '"Outfit", sans-serif', color: textMutedColor }}
            >
              Indore
            </span>
            <span 
              className="text-[18px] sm:text-[20px] font-medium tracking-tight leading-none mt-1"
              style={{ fontFamily: '"Outfit", sans-serif', color: textColor }}
            >
              Colleges
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
